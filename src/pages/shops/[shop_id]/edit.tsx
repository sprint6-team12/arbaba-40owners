import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import DaumPostcode from '@/components/AddShopPage/DaumPostcode';
import InputComponent from '@/components/AddShopPage/InputComponents';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormGroup from '@/components/FormGroup/FormGroup';
import ModalCustom from '@/components/Modal/ModalCustom';
import { SHOP_BASE_IMAGE, SHOP_MENU_CATEGORIES } from '@/constants/shopOptions';
import useModal from '@/hooks/useModal';
import { imageAPI } from '@/lib/api/imageAPI';
import { getShop, putShop } from '@/lib/api/shopAPI';
import FormatUtils from '@/lib/utils/FormatUtils';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { validateShopInfo } from '@/lib/utils/validation';
import { userState } from '@/recoil/atoms/AuthAtom';

interface ShopType {
  shopName: string;
  category: string;
  address1: string;
  address2: string;
  hourlyPay: string;
  shopDescription?: string | undefined;
  imageUrl?: string;
}

function EditShopPage() {
  const router = useRouter();
  const { isLogin, shopId } = useRecoilValue(userState);

  const [formData, setFormData] = useState<ShopType>({
    shopName: '',
    category: '',
    address1: '',
    address2: '',
    hourlyPay: '',
    shopDescription: '',
    imageUrl: SHOP_BASE_IMAGE,
  });
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<Partial<ShopType>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const shop_id = shopId;
  const hourlyPayNumber = Number(formData.hourlyPay);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      router.push('/');
      return;
    }

    const getShopData = async () => {
      try {
        const shopData = await getShop(shop_id as string);
        setFormData({
          shopName: shopData.item.name,
          category: shopData.item.category,
          address1: shopData.item.address1,
          address2: shopData.item.address2,
          hourlyPay: shopData.item.originalHourlyPay.toString(),
          shopDescription: shopData.item.description,
          imageUrl: shopData.item.imageUrl,
        });
        setImagePreview(shopData.item.imageUrl);
      } catch (error) {
        alert('가게 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setDisabled(false);
      }
    };

    if (shop_id) {
      getShopData();
    }
  }, [shop_id, isLogin, router]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    let newValue = value;
    if (id === 'hourlyPay') {
      const valueWithoutCommas = value.replace(/,/g, '');
      newValue = valueWithoutCommas.replace(/[^0-9]/g, '');
    } else {
      newValue = value.replace(/,/g, '');
    }
    const errorMessage = validateShopInfo(id as keyof ShopType, newValue);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));
  };

  const handleDropdownChange = (id: keyof ShopType, value: string) => {
    const errorMessage = validateShopInfo(id, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file === undefined) return;
    const imageUrl = await imageAPI(file);
    setFormData((prevFormData) => ({ ...prevFormData, imageUrl: imageUrl }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleClose = () => {
    router.push(`/shops/${shopId}`);
  };

  const handleImageReset = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrl: SHOP_BASE_IMAGE,
    }));
    setImagePreview(SHOP_BASE_IMAGE);
  };

  const handleTotalSubmit = async () => {
    try {
      if (
        formData.shopName &&
        formData.category &&
        formData.address1 &&
        formData.address2 &&
        hourlyPayNumber
      ) {
        setDisabled(true);
        const data = await putShop(shop_id as string, {
          name: formData.shopName,
          category: formData.category,
          address1: formData.address1,
          address2: formData.address2,
          description: formData.shopDescription,
          imageUrl: formData.imageUrl,
          originalHourlyPay: hourlyPayNumber,
        });
        if (data) {
          alert('수정이 완료되었습니다');
          router.push(`/shops/${shopId}`);
        }
      } else {
        alert('필수 입력 내용을 입력해주세요.');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleComplete = (data: DaumPostcodeData) => {
    let address1 = '';
    let address2 = '';

    address1 = data.sido + '시' + ' ' + data.sigungu;

    if (data.userSelectedType === 'R') {
      address2 = data.roadAddress.replace(address1, '').trim();
    } else {
      address2 = data.jibunAddress.replace(address1, '').trim();
    }

    setFormData((prev) => ({
      ...prev,
      address1: address1,
      address2: address2,
    }));

    closeModal('specialModal');
  };

  const handleSearchAddress = () => {
    openModal(
      'specialModal',
      ({
        onClose,
        autoClose = true,
      }: {
        onClose?: () => void;
        autoClose?: boolean;
      }) => (
        <ModalCustom
          autoClose={autoClose}
          onClose={onClose}
          content={<DaumPostcode onComplete={handleComplete} />}
        />
      )
    );
  };

  return (
    <>
      <div className="bg-gray05 w-full m-auto">
        <div className="flex flex-col w-full max-w-[964px] gap-4 pt-32px px-12px mx-auto tablet:px-48px tablet:py-48px pc:px-96px pc:py-64px">
          <div className="flex justify-between h-24px">
            <h3 className="text-black font-bold text-20px tablet:text-24px pc:text-30px">
              가게 정보 수정
            </h3>
            <button aria-label="닫기" onClick={handleClose}>
              <IconCloseBlack />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-12px">
              <div className="flex flex-col gap-8px">
                <div className="flex flex-col tablet:flex-row tablet:gap-20px pc:flex-row pc:gap-20px">
                  <InputComponent
                    id="shopName"
                    name="가게 이름*"
                    type="input"
                    placeholder="입력"
                    value={formData.shopName}
                    onChange={handleInputChange}
                    errorMessage={errors.shopName || ''}
                    className="tablet:w-1/2 pc:w-1/2"
                  />
                  <div className="flex flex-col mt-8px gap-8px my-4px tablet:gap-12px tablet:w-1/2 pc:gap-12px pc:w-1/2">
                    <h3>분류*</h3>
                    <Dropdown
                      options={SHOP_MENU_CATEGORIES}
                      onSelect={(value) =>
                        handleDropdownChange('category', value)
                      }
                      width="100%"
                      defaultValue={formData.category || '선택'}
                      prevValue={formData.category}
                    />
                    {errors.category && (
                      <p className="text-red-500">{errors.category}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col tablet:flex-row tablet:gap-20px pc:flex-row pc:gap-20px">
                  <div className="flex w-full flex-row gap-12px tablet:w-1/2 pc:w-1/2">
                    <div className="flex-grow">
                      <InputComponent
                        id="address1"
                        name="주소*"
                        type="input"
                        placeholder="입력"
                        value={formData.address1}
                        errorMessage={errors.address1 || ''}
                      />
                    </div>
                    <button
                      className="w-90px mt-44px mb-8px bg-gray30 rounded-[4px]"
                      onClick={handleSearchAddress}
                    >
                      검색
                    </button>
                  </div>
                  <InputComponent
                    id="address2"
                    name="상세 주소*"
                    type="input"
                    placeholder="입력"
                    value={formData.address2}
                    onChange={handleInputChange}
                    errorMessage={errors.address2 || ''}
                    className="tablet:w-1/2 pc:w-1/2"
                  />
                </div>
                <InputComponent
                  id="hourlyPay"
                  name="기본 시급*"
                  type="input"
                  placeholder="입력"
                  value={FormatUtils.price(hourlyPayNumber)}
                  onChange={handleInputChange}
                  errorMessage={errors.hourlyPay || ''}
                  className="tablet:w-1/2 pc:w-1/2"
                />
              </div>
              <div className="flex flex-col mt-8px gap-8px my-4px">
                <p>가게 이미지</p>
                {imagePreview !== SHOP_BASE_IMAGE ? (
                  <div className="relative w-full aspect-[7/4] tablet:w-[483px] tablet:h-[276px] pc:w-[483px] pc:h-[276px] rounded-md">
                    <button className="absolute z-10 bg-gray05 mt-5px right-17px rounded-[12px] w-60px h-24px">
                      <p onClick={handleImageReset}>삭제</p>
                    </button>
                    <Image
                      src={imagePreview || ''}
                      alt="업로드된 이미지"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div className="tablet:w-[483px] tablet:h-[276px] pc:w-[483px] pc:h-[276px] rounded-md">
                    <FormGroup.InputField.Image
                      id="imageUrl"
                      name="imageUrl"
                      onChange={handleImageChange}
                      className="w-full "
                    />
                  </div>
                )}
              </div>
              <InputComponent
                id="shopDescription"
                name="가게 설명"
                type="textarea"
                placeholder="입력"
                value={formData.shopDescription}
                onChangeTextArea={handleInputChange}
                errorMessage=""
              />
            </div>
          </form>
          <div className="mx-auto">
            <Button
              className="button_large"
              type="submit"
              onClick={handleTotalSubmit}
              disabled={disabled}
            >
              수정하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditShopPage;
