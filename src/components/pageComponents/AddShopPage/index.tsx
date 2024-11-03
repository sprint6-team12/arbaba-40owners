import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import DaumPostcode from '@/components/AddShopPage/DaumPostcode';
import InputComponent from '@/components/AddShopPage/InputComponents';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormGroup from '@/components/FormGroup/FormGroup';
import ModalCustom from '@/components/Modal/ModalCustom';
import { SHOP_BASE_IMAGE, SHOP_MENU_CATEGORIES } from '@/constants/shopOptions';
import useModal from '@/hooks/useModal';
import { imageAPI } from '@/lib/api/imageAPI';
import { postShop } from '@/lib/api/shopAPI';
import FormatUtils from '@/lib/utils/FormatUtils';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { validateShopInfo } from '@/lib/utils/validation';
import { userState } from '@/recoil/atoms/AuthAtom';
import ConfirmModal from './ConfirmModal';

interface ShopType {
  name: string;
  category: string;
  address1: string;
  hourlyPay: string;
  address2: string;
  description?: string | undefined;
  imageUrl?: string | undefined;
}

function AddShopPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ShopType>({
    name: '',
    category: '',
    address1: '',
    address2: '',
    hourlyPay: '',
    description: '',
    imageUrl: SHOP_BASE_IMAGE,
  });
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<Partial<ShopType>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(
    SHOP_BASE_IMAGE
  );
  const setAuthState = useSetRecoilState(userState);
  const { openModal, closeModal } = useModal();
  const hourlyPayNumber = Number(formData.hourlyPay);

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
    setImagePreview(imageUrl);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleClose = () => {
    router.push(`/shops/undefined`);
  };

  const handleImageReset = () => {
    setImagePreview(SHOP_BASE_IMAGE);
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrl: SHOP_BASE_IMAGE,
    }));
  };

  const handleOpenConfirmModal = (content: string) => {
    openModal('addShopConfirmModal', ConfirmModal, {
      content: content,
    });
  };

  const handleTotalSubmit = async () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.address1 ||
      !formData.address2 ||
      !formData.hourlyPay
    ) {
      handleOpenConfirmModal('필수 입력 내용을 입력해주세요.');
      return;
    }

    try {
      setDisabled(true);
      const { hourlyPay, ...restFormData } = formData;
      const hourlyPayNumber = Number(hourlyPay);
      const data = await postShop(
        {
          ...restFormData,
          originalHourlyPay: hourlyPayNumber,
        },
        setAuthState
      );
      if (data) {
        const shopId = data.item.id;
        handleOpenConfirmModal('등록이 완료되었습니다.');
        router.push(`/shops/${shopId}`);
      }
    } catch (error) {
      alert(error);
    } finally {
      setDisabled(false);
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
                  id="name"
                  name="가게 이름*"
                  type="input"
                  placeholder="입력"
                  value={formData.name}
                  onChange={handleInputChange}
                  errorMessage={errors.name || ''}
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
              id="description"
              name="가게 설명"
              type="textarea"
              placeholder="입력"
              value={formData.description}
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
  );
}

export default AddShopPage;
