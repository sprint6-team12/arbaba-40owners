import { useRouter } from 'next/router';
import { useState } from 'react';
import { LOCATIONS, MENU_CATEGORIES } from '@/constants/DataLocations';
import shopAPI from '@/utils/api/shopAPI';
import { IconCloseBlack } from '@/utils/Icons';
import { validateShopInfo } from '@/utils/validation';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import FormGroup from '../FormGroup/FormGroup';
import imageAPI from './../../utils/api/imageAPI';
import InputComponent from './InputComponents';

interface ShopType {
  shopName: string;
  category: string;
  address1: string;
  address2: string;
  hourlyPay: string;
  shopDescription?: string | undefined;
  imageUrl?: string | undefined;
}

function AddShopPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ShopType>({
    shopName: '',
    category: '',
    address1: '',
    address2: '',
    hourlyPay: '',
    shopDescription: '',
    imageUrl: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<ShopType>({
    shopName: '',
    category: '',
    address1: '',
    address2: '',
    hourlyPay: '',
  });

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
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  const handleTotalSubmit = async () => {
    const hourlyPayNumber = Number(formData.hourlyPay);
    try {
      if (
        formData.shopName &&
        formData.category &&
        formData.address1 &&
        formData.address2 &&
        hourlyPayNumber
      ) {
        setDisabled(true);
        const data = await shopAPI.postShop({
          name: formData.shopName,
          category: formData.category,
          address1: formData.address1,
          address2: formData.address2,
          description: formData.shopDescription,
          imageUrl: formData.imageUrl,
          originalHourlyPay: hourlyPayNumber,
        });
        if (data) {
          alert('등록이 완료되었습니다');
          router.push('myShopInfo');
        }
      } else {
        alert('필수 입력 내용을 입력해주세요.');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="flex flex-col pt-40px pb-80px px-12px gap-24px bg-gray05">
        <div className="w-full h-35 flex justify-between">
          <h1 className="w-112 h-35 text-20px font-[700]">가게 정보</h1>
          <button>
            <IconCloseBlack />
          </button>
        </div>
        <form className="flex flex-col gap-20px" onSubmit={handleSubmit}>
          <InputComponent
            id="shopName"
            name="가게 이름*"
            type="input"
            placeholder="입력"
            value={formData.shopName}
            onChange={handleInputChange}
            errorMessage={errors.shopName}
          />
          <div className="flex flex-col gap-8px">
            <h1>분류*</h1>
            <Dropdown
              options={MENU_CATEGORIES}
              onSelect={(value) => handleDropdownChange('category', value)}
              width="100%"
              defaultValue={formData.category || '선택'}
            />
            {errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )}
          </div>
          <div className="flex flex-col gap-8px">
            <h1>주소*</h1>
            <Dropdown
              options={LOCATIONS}
              onSelect={(value) => handleDropdownChange('address1', value)}
              width="100%"
              defaultValue={formData.address1 || '선택'}
            />
            {errors.address1 && (
              <p className="text-red-500">{errors.address1}</p>
            )}
          </div>
          <InputComponent
            id="detailedAddress"
            name="상세 주소*"
            type="input"
            placeholder="입력"
            value={formData.address2}
            onChange={handleInputChange}
            errorMessage={errors.address2}
          />
          <InputComponent
            id="hourlyPay"
            name="기본 시급*"
            type="input"
            placeholder="입력"
            value={formData.hourlyPay}
            onChange={handleInputChange}
            errorMessage={errors.hourlyPay}
          />
          <div className="flex flex-col gap-8px">
            <h1>가게 이미지</h1>
            <FormGroup.InputField.Image
              id="imageUrl"
              name="imageUrl"
              onChange={handleImageChange}
            />
            {errors.imageUrl && (
              <p className="text-red-500">{errors.imageUrl}</p>
            )}
          </div>
          <InputComponent
            id="shopDescription"
            name="가게 설명"
            type="textarea"
            placeholder="입력"
            value={formData.shopDescription}
            onChangeTextArea={handleInputChange}
          />
          <div className="flex-center mt-8 px-200px">
            <Button
              className="button_large"
              type="submit"
              onClick={() => handleTotalSubmit()}
              disabled={disabled}
            >
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddShopPage;
