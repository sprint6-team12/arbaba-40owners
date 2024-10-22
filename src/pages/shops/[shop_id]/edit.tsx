import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
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
  const { openModal } = useModal();

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

    let newValue = value; // 기본 입력값

    // "hourlyPay"일 때 숫자만 허용
    if (id === 'hourlyPay') {
      // 콤마 제거
      const valueWithoutCommas = value.replace(/,/g, '');

      // 숫자만 필터링
      newValue = valueWithoutCommas.replace(/[^0-9]/g, '');
    } else {
      // 다른 경우에는 콤마 제거만 수행
      newValue = value.replace(/,/g, '');
    }

    // 입력값 검증
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

  const SpecialModal = ({
    onClose,
    autoClose = true,
  }: {
    onClose?: () => void;
    autoClose?: boolean;
  }) => (
    <ModalCustom
      autoClose={autoClose}
      onClose={onClose}
      content={
        <div className="w-full h-ful min-w-full min-h-screen relative bg-white border rounded-[20px] border-gray-200">
          <div className="w-[400px] mx-auto mt-10 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="flex justify-between items-center p-4 bg-red-200 rounded-t-md">
              <input
                type="text"
                placeholder="주소 검색"
                className="w-full px-4 py-2 border-none outline-none bg-red-200 text-black"
              />
              <button className="ml-2 text-gray-600 hover:text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12h.01M12 15l3-3m0 0l3-3m-3 3h-6m3-3l-3 3m6-3h.01M12 9m0 6h.01m-6-6m6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 border-t border-gray-300">
              <div className="text-red-500 text-xl font-semibold">13529</div>
              <div className="mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                  도로명
                </span>
                <span className="ml-2 text-gray-800">
                  경기 성남시 분당구 판교역로 166 (카카오 판교 아지트)
                </span>
              </div>
              <div className="mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                  지번
                </span>
                <span className="ml-2 text-gray-800">
                  경기 성남시 분당구 백현동 532
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-gray-300 text-center">
              <span className="text-gray-600">1 / 1</span>
            </div>

            <div className="flex justify-center items-center p-4 bg-gray-100 text-gray-500 rounded-b-md text-sm">
              <span>Powered by </span>
              <span className="ml-1 text-black font-bold">kakao</span>
              <a href="#" className="ml-2 underline hover:text-gray-700">
                우편번호 서비스 안내
              </a>
            </div>
          </div>

          <IconCloseBlack
            className="absolute cursor-pointer top-20px right-20px"
            onClick={onClose}
            aria-label="닫기"
          />
        </div>
      }
    />
  );

  const handleSearchAddress = () => {
    openModal('specialModal', SpecialModal);
  };

  return (
    <>
      <div className="bg-gray05 w-full m-auto">
        <div className="flex flex-col w-full max-w-[964px] gap-4 pt-32px px-12px mx-auto tablet:px-48px tablet:py-48px pc:px-96px pc:py-64px">
          <div className="flex justify-between h-24px">
            <h3 className="text-black font-bold text-20px tablet:text-24px pc:text-30px">
              가게 정보 수정
            </h3>
            <button onClick={handleClose}>
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
                        id="shopName"
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
                  <div className="relative w-full tablet:max-w-[483px] tablet:max-h-[273px] pc:max-w-[483px] pc:max-h-[273px] rounded-md">
                    <button className="absolute bg-gray05 mt-5px right-17px rounded-[12px] w-60px h-24px ">
                      <p onClick={handleImageReset}>삭제</p>
                    </button>
                    <Image
                      src={imagePreview || ''}
                      alt="업로드된 이미지"
                      layout="responsive"
                      width={483}
                      height={276}
                      className="tablet:max-w-[483px] tablet:max-h-[276px] pc:max-w-[483px] pc:max-h-[276px]  rounded-md"
                    />
                  </div>
                ) : (
                  <FormGroup.InputField.Image
                    id="imageUrl"
                    name="imageUrl"
                    onChange={handleImageChange}
                    className="w-full "
                  />
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
