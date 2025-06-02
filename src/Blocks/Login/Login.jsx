import style from "./Login.module.scss";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";

const schema = z.object({
  phone: z
    .string({
      required_error: "Вы не ввели номер телефона",
    })
    .min(11, "Хде номер?")
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Некорректный формат номера"),
  addInfo: z.string().optional(),
  password: z.string().min(6, "Некорректный пароль"),
});

const phoneMaskOptions = {
  mask: "+{7} (000) 000-00-00",
  radix: ".",
  unmask: false,
};

function Login({ onLogin }) {
  const { register, handleSubmit, control, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.phone === data.phone && u.password === data.password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin(user);
    } else {
      alert("Неверный телефон или пароль");
    }
    reset();
  };

  return (
    <div className={style.login}>
      <h2>Вход в Личный кабинет</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                className={style.phone}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="password">
            Пароль <div className={style.important}></div>
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className={style.password}
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
