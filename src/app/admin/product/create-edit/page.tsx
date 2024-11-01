"use client";
import FrameStyle from "@/components/FrameStyle";
import AdminPageTitle from "@/components/MoComponent/AdminPageTitle";
import UploadFile from "@/components/UploadFile";
import Product, {
  ProductCreate,
  ProductData,
  ProductError,
} from "@/interface/Product";
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  Space,
} from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import EditorCustom from "@/components/EditorCustom";
import ImagePreview from "@/components/ImagePreview";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { pauseLoading, playLoading } from "@/stores/commonSlice";
import { apiCreateProduct, getProductById } from "@/api/data.api";
import { startLoadingInitial } from "@/stores/adminDataSlice";

function CreatedEditProduct() {
  const { categories } = useAppSelector((state) => state.adminData);
  const { accessToken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const productId = params.get("productId");
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<any>();
  const [images, setImages] = useState<Array<any>>();
  const [description, setDiscription] = useState<string>("");
  const [options, setOptions] = useState<Array<any>>([]);
  const [errors, setErrors] = useState<ProductError>();
  const [product, setProduct] = useState<ProductData>();

  const onFinish: FormProps<ProductCreate>["onFinish"] = async (value) => {
    if (!thumbnail) {
      setErrors({
        name: "thumbnail",
        message: "Vui lòng chọn hình ảnh sản phẩm!",
      });
      return;
    }

    if (!images || images?.length <= 0) {
      setErrors({
        name: "images",
        message: "Vui lòng chọn ít nhất 1 ảnh!",
      });
      return;
    }

    if (!description) {
      setErrors({
        name: "description",
        message: "Hãy mô tả sản phẩm của bạn!",
      });
      return;
    }

    value.description = description;
    value.images = images;
    value.thumbnail = thumbnail;

    if (accessToken) {
      dispatch(playLoading());
      const response = await apiCreateProduct(accessToken, value);
      dispatch(pauseLoading());
      if (response.success) {
        dispatch(startLoadingInitial());
        message.success(response.data);
        router.back();
        return;
      }

      message.error(response.data);
    }
  };

  const onFinishFailed = () => {};

  const handleSetDescription = (value: any) => {
    setDiscription(value);
    if (errors?.name === "description") {
      setErrors(undefined);
    }
  };

  const handlePreview = (event: any) => {
    if (event.target.files.length > 0) {
      if (event.target.files[0].type.startsWith("image")) {
        const file = event.target.files[0];
        file.preview = URL.createObjectURL(file);

        setThumbnail(file);
        if (errors?.name === "thumbnail") {
          setErrors(undefined);
        }
      }
    }
  };

  const handleRemoveThumnail = () => {
    setThumbnail(undefined);
  };

  const handleRemoveImage = (index: number) => {
    const newList = images?.filter((_, indexImg) => indexImg !== index);
    setImages(newList);
  };

  const handleSelectImages = (event: any) => {
    if (event.target.files) {
      const listImage = [];
      const listFile = event.target.files;
      if (listFile.length > 0) {
        for (var i = 0; i < listFile.length; i++) {
          const file = listFile[i];
          if (file.type.startsWith("image")) {
            file.preview = URL.createObjectURL(file);

            listImage.push(file);
          }
        }
        if (images && images?.length > 0) {
          setImages([...images, ...listImage]);
          return;
        }
        setImages(listImage);
        if (errors?.name === "images") {
          setErrors(undefined);
        }
      }
    }
  };

  const fetchProduct = async (productId: string) => {
    const response = await getProductById(productId);
    if (response.success && response.data) {
      console.log("ok");
      setProduct(response.data);
    }
  };

  useEffect(() => {
    // free memory when ever this component is unmounted
    if (!thumbnail) return;
    return () => URL.revokeObjectURL(thumbnail?.preview);
  }, [thumbnail]);

  useEffect(() => {
    // free memory when ever this component is unmounted
    if (!images) return;
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image?.preview);
      });
    };
  }, [images]);

  useEffect(() => {
    if (categories) {
      const newList = categories.map((category) => ({
        label: category.full_name,
        value: category._id,
      }));
      if (newList) {
        setOptions(newList);
      }
    }
  }, [categories]);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  return (
    <div>
      <FrameStyle className="bg-white">
        <AdminPageTitle
          title={productId ? "Chỉnh sửa sản phẩm" : "Đăng bán sản phẩm mới"}
        />
      </FrameStyle>
      <FrameStyle className="bg-white mt-[20px]">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          fields={[
            {
              name: "full_name",
              value: product?.product?.full_name,
            },
            {
              name: "price",
              value: product?.product?.price,
            },
            {
              name: "stock",
              value: product?.product?.stock,
            },
            {
              name: "categories",
              value: product?.product?.categories || null,
            },
          ]}
        >
          <div className="flex items-start gap-[20px] ">
            <div className="flex-1">
              <Form.Item<ProductCreate>
                label="Tên sản phẩm"
                name="full_name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<ProductCreate>
                label="Giá"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá sản phẩm!",
                  },
                ]}
              >
                <InputNumber min={0} addonAfter="VNĐ" />
              </Form.Item>
              <Form.Item<ProductCreate>
                label="Số lượng nhập kho"
                name="stock"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng nhập kho!",
                  },
                ]}
              >
                <InputNumber min={1} max={1000} addonAfter="sản phẩm" />
              </Form.Item>

              <Form.Item<ProductCreate>
                label="Danh mục"
                name="categories"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn danh mục sản phẩm!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn danh mục"
                  options={options}
                  optionRender={(category) => (
                    <Space>
                      <span role="img">{category.label}</span>
                    </Space>
                  )}
                />
              </Form.Item>
            </div>
            <div className="flex-1">
              <div>
                <div className="flex items-center gap-[8px]">
                  <p className="text-red-500 text-lg">*</p>
                  <p>Hình ảnh: </p>
                  <UploadFile
                    onChange={handlePreview}
                    id="thumbnail"
                    title="Tải ảnh lên"
                  />
                </div>
                {errors?.name === "thumbnail" && (
                  <p className="text-red-500 text-sm mt-[10px]">
                    {errors.message}
                  </p>
                )}
                {thumbnail && thumbnail.preview && (
                  <ImagePreview
                    image={thumbnail.preview}
                    onRemove={handleRemoveThumnail}
                  />
                )}
              </div>

              <div className="mt-[20px]">
                <div className="flex items-center gap-[8px]">
                  <p className="text-red-500 text-lg">*</p>
                  <p>Danh sách hình ảnh: </p>
                  <UploadFile
                    onChange={handleSelectImages}
                    multiple={true}
                    id="images"
                    title="Tải ảnh lên"
                  />
                </div>
                {errors?.name === "images" && (
                  <p className="text-red-500 text-sm mt-[10px]">
                    {errors.message}
                  </p>
                )}
                {images && images.length > 0 && (
                  <div className="grid grid-cols-6 gap-[10px] mb-[10px] mt-[20px]">
                    {images?.map((img, index) => (
                      <ImagePreview
                        key={index}
                        image={img.preview}
                        onRemove={() => handleRemoveImage(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-[8px] mt-[20px]">
            <div className="flex items-center gap-[8px]">
              <p className="text-red-500 text-lg">*</p>
              <p>Mô tả sản phẩm: </p>
            </div>
            <EditorCustom
              onChange={(value: string) => handleSetDescription(value)}
              content={description}
            />
            {errors?.name === "description" && (
              <p className="text-red-500 text-sm mt-[10px] ml-[10px]">
                {errors.message}
              </p>
            )}
          </div>
          <Form.Item className="flex justify-center mt-[20px]">
            <Button type="primary" htmlType="submit">
              {productId ? "Cập nhật" : "Đăng bán"}
            </Button>
          </Form.Item>
        </Form>
      </FrameStyle>
    </div>
  );
}

export default CreatedEditProduct;
