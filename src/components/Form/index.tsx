import React, { useRef, useState } from "react";

import { formValidator } from "../../utils/form.validator";
import { Position, UserForm } from "../../../types";
import useForm from "../../hooks/useForm";
import styles from "./styles.module.scss";
import Preloader from "../Preloader";
import Button from "../Button";

interface IProps {
  positions: Position[];
  onSubmit: (form: UserForm, file: File) => Promise<void>;
}

const MAX_SIZE = 5 * 1024 * 1024;

const Form = ({ positions, onSubmit }: IProps) => {
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const [sendLoading, setSendLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [errors, setError] = useState<{ [key: string]: string }>({});
  const [file, setFile] = useState<File | null>(null);
  const { form, onChange, resetForm } = useForm({
    name: "",
    email: "",
    phone: "",
    position_id: "",
  });

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: { [key: string]: string } = {};

    if (
      !formValidator.isEmail(form.email) ||
      !formValidator.fieldLength(form.email, 2, 100)
    ) {
      formErrors["email"] =
        "Field has to be an email with length between 2 and 100 chars";
    }

    if (
      formValidator.isEmpty(form.name) ||
      !formValidator.fieldLength(form.name, 2, 60)
    ) {
      formErrors["name"] = "Field has to be between 2 and 60 chars";
    }

    if (
      formValidator.isEmpty(form.phone) ||
      !formValidator.isUaPhone(form.phone)
    ) {
      formErrors["phone"] = "Phone must start with +380";
    }

    if (formValidator.isEmpty(form.position_id)) {
      formErrors["position_id"] = "Choose one position";
    }

    if (!file || file.size > MAX_SIZE) {
      formErrors["photo"] = "Choose user's photo, not larger then 5Mb";
    }

    if (Object.keys(formErrors).length) {
      return setError({ ...errors, ...formErrors });
    }

    setSendLoading(true);
    await onSubmit(form, file!);
    resetForm();
    setSendLoading(false);
  };

  const handlerFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    errors[name] && delete errors[name];
    setFormDisabled(false);
    onChange(e);
  };

  const handlerSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    errors["photo"] && delete errors["photo"];
    const photo = e.target.files[0];

    setFile(photo);
  };

  const handlerOnUploadClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!uploadRef.current) {
      return;
    }
    uploadRef.current.click();
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^[0-9+]*$/;
    const val = e.target.value;
    setFormDisabled(false);

    if (!reg.test(val)) {
      return;
    }

    handlerFormChange(e);
  };

  const renderError = (name: string) => {
    return errors && errors[name] ? (
      <p className={styles.form__errorMsg}>{errors[name]}</p>
    ) : null;
  };

  const positionsJSX =
    !positions || !positions.length ? (
      <div className={styles.form__loader}>
        <Preloader />
      </div>
    ) : (
      <label className={`${styles.form__field} ${styles.form__mt0}`}>
        <p>Select your position</p>
        {positions.map((el) => (
          <label key={el.id} className={styles.form__radio}>
            <input
              type="radio"
              name="position_id"
              value={el.id}
              onChange={handlerFormChange}
              className={styles.form__radioItem}
            />
            <p>{el.name}</p>
          </label>
        ))}
        {errors && renderError("position_id")}
      </label>
    );

  if (sendLoading) {
    return (
      <div className={styles.section}>
        <Preloader />;
      </div>
    );
  }

  return (
    <form className={styles.form}>
      <label className={styles.form__field}>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={handlerFormChange}
          className={`${styles.form__item} ${
            errors && errors["name"] ? styles.form__errorField : ""
          }`}
        />
        {errors && renderError("name")}
      </label>
      <label className={styles.form__field}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handlerFormChange}
          className={`${styles.form__item} ${
            errors && errors["email"] ? styles.form__errorField : ""
          }`}
        />
        {errors && renderError("email")}
      </label>
      <label className={styles.form__field}>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onPhoneChange}
          placeholder="Phone"
          className={`${styles.form__item} ${
            errors && errors["phone"] ? styles.form__errorField : ""
          }`}
        />
        <p className={styles.form__subtitle}>+38 (XXX) XXX-XX-XX</p>
        {errors && renderError("phone")}
      </label>
      {positionsJSX}
      <label className={`${styles.form__field} ${styles.form__uploadWrapper}`}>
        <div className={styles.form__upload}>
          <input
            type="file"
            name="photo"
            accept="image/jpg, image/jpeg"
            onChange={handlerSelectFile}
            className={styles.form__file}
            ref={uploadRef}
          />
          <button
            onClick={handlerOnUploadClick}
            className={`${styles.form__btnUpload} ${
              errors && errors["photo"] ? styles.form__errorField : ""
            }`}
          >
            Upload
          </button>
          <input
            type="text"
            readOnly
            placeholder={file ? file?.name : "Upload your photo"}
            className={`${styles.form__item} ${styles.form__item_disabled} ${
              errors && errors["photo"] ? styles.form__errorField : ""
            }`}
          />
        </div>
        {errors && renderError("photo")}
      </label>
      <label className={styles.form__submit}>
        <Button
          disabled={formDisabled}
          title="Sign up"
          onClick={handlerSubmit}
        />
      </label>
    </form>
  );
};

export default Form;
