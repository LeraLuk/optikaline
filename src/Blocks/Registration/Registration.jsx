import style from "./Registration.module.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

const schema = z.object({
  fio: z.string().min(2, "Введите ФИО"),
  company: z.string().min(1, "Введите название компании"),
  position: z.string().min(1, "Введите должность"),
  inn: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Некорректный формат номера"),
  addInfo: z.string().optional(),
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
});

const phoneMaskOptions = {
  mask: "+{7} (000) 000-00-00",
  radix: ".",
  unmask: false,
};

function Registration({ onRegisterSuccess, onCancel }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === data.email)) {
      alert("Пользователь с этим email уже зарегистрирован");
      return;
    }
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Регистрация прошла успешно!");
    if (onRegisterSuccess) {
      onRegisterSuccess(data);
    }
    reset();
  };

  return (
    <div className={style.registration}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="fio">
              ФИО <div className={style.important}></div>
            </label>
            <input type="text" {...register("fio")} id="fio" />
            {errors.fio && <p>{errors.fio.message}</p>}
          </div>
          <div>
            <label htmlFor="company">
              Компания (ООО/ИП) <div className={style.important}></div>
            </label>
            <input type="text" {...register("company")} id="company" />
            {errors.company && <p>{errors.company.message}</p>}
          </div>
          <div>
            <label htmlFor="position">
              Должность <div className={style.important}></div>
            </label>
            <input type="text" {...register("position")} id="position" />
            {errors.position && <p>{errors.position.message}</p>}
          </div>
          <div>
            <label htmlFor="inn">ИНН</label>
            <input type="text" {...register("inn")} id="inn" />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="phone">
              Телефон <div className={style.important}></div>
            </label>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <IMaskInput
                  id="phone"
                  {...field}
                  mask={phoneMaskOptions.mask}
                  radix={phoneMaskOptions.radix}
                  unmask={false}
                  placeholder="+7 (___) ___-__-__"
                  value={field.value}
                />
              )}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input type="email" {...register("email")} id="email" />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password">
              Пароль <div className={style.important}></div>
            </label>
            <input type="password" {...register("password")} id="password" />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <br />
          <button type="submit">Зарегистрироваться</button>
        </div>
      </form>
      <button type="button" onClick={onCancel}>
        Назад
      </button>
    </div>
  );
}

export default Registration;
