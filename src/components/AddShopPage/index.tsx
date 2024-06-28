import { useState } from 'react';
import { LOCATIONS, MENU_CATEGORIES } from '@/constants/DataLocations';
import { IconCloseBlack } from '@/utils/Icons';
import { validateShopInfo } from '@/utils/validation';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import FormGroup from '../FormGroup/FormGroup';
import Gnb from '../Gnb/Gnb';
import InputComponent from './InputComponents';

interface ShopType {
  shopName: string;
  category: string;
  address1: string;
  detailedAddress: string;
  hourlyPay: string;
  shopDescription: string;
  imageUrl: string;
}

function AddShopPage() {
  const [formData, setFormData] = useState<ShopType>({
    shopName: '',
    category: '',
    address1: '',
    detailedAddress: '',
    hourlyPay: '',
    shopDescription: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState<ShopType>({
    shopName: '',
    category: '',
    address1: '',
    detailedAddress: '',
    hourlyPay: '',
    shopDescription: '',
    imageUrl: '',
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prevFormData) => ({
          ...prevFormData,
          imageUrl: base64String,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, imageUrl: '' }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 유효성 검사
    let valid = true;
    const newErrors: ShopType = { ...errors };

    (Object.keys(formData) as (keyof ShopType)[]).forEach((key) => {
      const errorMessage = validateShopInfo(key, formData[key]);
      if (errorMessage) {
        valid = false;
        newErrors[key] = errorMessage;
      }
    });

    setErrors(newErrors);

    if (valid) {
      // 여기서 폼 데이터를 제출하는 로직을 추가합니다.
      //console.log('Form submitted:', formData);
    }
  };

  return (
    <>
      <Gnb userType="employer" />
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
            value={formData.detailedAddress}
            onChange={handleInputChange}
            errorMessage={errors.detailedAddress}
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
            onChange={handleInputChange}
            errorMessage={errors.shopDescription}
          />
          <div className="flex-center">
            <Button className="button_large" type="submit">
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddShopPage;
