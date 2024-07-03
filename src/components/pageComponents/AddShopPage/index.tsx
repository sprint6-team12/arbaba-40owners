import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormGroup from '@/components/FormGroup/FormGroup';
import { SHOP_LOCATIONS, SHOP_MENU_CATEGORIES } from '@/constants/shopOptions';
import useModal from '@/hooks/useModal';
import imageAPI from '@/lib/api/imageAPI';
import shopAPI from '@/lib/api/shopAPI';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { validateShopInfo } from '@/lib/utils/validation';
import ConfirmModal from './ConfirmModal';
import InputComponent from './InputComponents';

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
    imageUrl: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ShopType>({
    name: '',
    category: '',
    address1: '',
    address2: '',
    hourlyPay: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { openModal } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    const errorMessage = validateShopInfo(id as keyof ShopType, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
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

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleClose = () => {
    router.push('/my-shop');
  };

  const handleImageReset = () => {
    setImagePreview('');
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
      const { hourlyPay, ...restFormData } = formData; // hourlyPay를 분해할당
      const hourlyPayNumber = Number(hourlyPay);
      const data = await shopAPI.postShop({
        ...restFormData,
        originalHourlyPay: hourlyPayNumber,
      });
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

  return (
    <>
      <div className="flex w-full py-24px px-12px flex-col items-start gap-8px bg-gray05 tablet:px-48px tablet:py-48px pc:px-96px pc:py-64px">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-32px"
        >
          <div className="flex flex-col items-start gap-24px w-full tablet:gap-32px pc:gap-40">
            <div className="flex w-full justify-between items-center">
              <p className="text-black text-xl font-bold tablet:text-24px pc:text-30px">
                가게 정보
              </p>
              <button onClick={handleClose}>
                <IconCloseBlack />
              </button>
            </div>
            <div className="flex flex-col gap-20px w-full tablet:flex-row tablet:flex-wrap tablet:gap-24px pc:gap-32px">
              <div className="tablet:flex tablet:w-full tablet:h-92px tablet:gap-20px">
                <div className="flex flex-col gap-8px w-full tablet:w-1/2">
                  <InputComponent
                    id="name"
                    name="가게 이름*"
                    type="input"
                    placeholder="입력"
                    value={formData.name}
                    onChange={handleInputChange}
                    errorMessage={errors.name}
                  />
                </div>
                <div className="flex flex-col gap-8px w-full tablet:w-1/2">
                  <h1 className="mt-8px mb-4px">분류*</h1>
                  <Dropdown
                    options={SHOP_MENU_CATEGORIES}
                    onSelect={(value) =>
                      handleDropdownChange('category', value)
                    }
                    width="100%"
                    defaultValue={formData.category || '선택'}
                  />

                  {errors.category && (
                    <p className="text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>
              <div className="tablet:flex tablet:w-full tablet:h-92px tablet:gap-20px">
                <div className="flex flex-col gap-8px w-full tablet:w-1/2">
                  <h1 className="mt-8px mb-4px">주소*</h1>
                  <Dropdown
                    options={SHOP_LOCATIONS}
                    onSelect={(value) =>
                      handleDropdownChange('address1', value)
                    }
                    width="100%"
                    defaultValue={formData.address1 || '선택'}
                  />
                  {errors.address1 && (
                    <p className="text-red-500">{errors.address1}</p>
                  )}
                </div>
                <div className="flex flex-col gap-8px w-full tablet:w-1/2">
                  <InputComponent
                    id="address2"
                    name="상세 주소*"
                    type="input"
                    placeholder="입력"
                    value={formData.address2}
                    onChange={handleInputChange}
                    errorMessage={errors.address2}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-8px w-full pr-10px tablet:w-1/2">
                <InputComponent
                  id="hourlyPay"
                  name="기본 시급*"
                  type="input"
                  placeholder="입력"
                  value={formData.hourlyPay}
                  onChange={handleInputChange}
                  errorMessage={errors.hourlyPay}
                />
              </div>
              <div className="flex flex-col gap-8px w-full">
                <h1>가게 이미지</h1>
                <div className="inline-block relative">
                  <div onClick={handleClick}>
                    {imagePreview ? (
                      <>
                        <button>
                          <IconCloseBlack
                            onClick={handleImageReset}
                            className=""
                          />
                        </button>
                        <Image
                          src={imagePreview}
                          alt="Uploaded Image"
                          layout="responsive"
                          width={483}
                          height={276}
                          className="max-w-[483px] max-h-[276px] rounded-md"
                        />
                      </>
                    ) : (
                      <div className="flex justify-center items-center flex-shrink-0 rounded-[5px] border border-solid border-gray30 bg-gray10 h-276px w-483px">
                        <FormGroup.InputField.Image
                          id="imageUrl"
                          name="imageUrl"
                          onChange={handleImageChange}
                          className="border border-gray30 bg-gray20 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8px w-full h-187px">
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
              <div className="flex justify-center w-full mt-32px">
                <Button
                  className="button_large"
                  type="submit"
                  onClick={() => handleTotalSubmit()}
                  disabled={disabled}
                >
                  등록하기
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddShopPage;
