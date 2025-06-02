import style from "./PersonAcc.module.scss";
import { useState } from "react";
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

function PersonAcc({ user, setUser, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [showPassword, setShowPassword] = useState(false);

  const { control } = useForm({
    resolver: zodResolver(schema),
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setFormData(user); // сбрасываем к исходным значениям при входе
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // сохраняем в localStorage
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    if (onLogout) onLogout();
  };

  return (
    <div className={style.personacc}>
      <div className={style.buttons}>
        <button onClick={handleEditToggle}>Редактировать данные</button>
        <button onClick={handleLogout}>Выход</button>
      </div>

      {!isEditing ? (
        <div className={style.div1}>
          <div>
            <div>
              <h3>ФИО</h3>
              <p>{user.fio}</p>
            </div>
            <div>
              <h3>Компания</h3>
              <p>{user.company}</p>
            </div>
            <div>
              <h3>Должность</h3>
              <p>{user.position}</p>
            </div>
            <div>
              <h3>ИНН</h3>
              <p>{user.inn ?? ""}</p>
            </div>
          </div>
          <div>
            <div>
              <h3>Телефон</h3>
              <p>{user.phone}</p>
            </div>
            <div>
              <h3>E-mail</h3>
              <p>{user.email}</p>
            </div>
            <div className={style.button}>
              <h3>Пароль</h3>
              <div>
                <p>{showPassword ? user.password : "******"}</p>
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Скрыть пароль" : "Показать пароль"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.div2}>
          <div>
            <div>
              <label>ФИО</label>
              <input name="fio" value={formData.fio} onChange={handleChange} />
            </div>
            <div>
              <label>Компания</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Должность</label>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>ИНН</label>
              <input
                name="inn"
                value={formData.inn ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div>
              <label>Телефон</label>
              {/* <input name="phone" value={formData.phone} /> */}
              <Controller
                name="phone"
                control={control}
                defaultValue={user.phone || ""}
                render={({ field }) => (
                  <IMaskInput
                    id="phone"
                    {...field}
                    mask={phoneMaskOptions.mask}
                    radix={phoneMaskOptions.radix}
                    unmask={false}
                    placeholder="+7 (___) ___-__-__"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)} // передача нового значения
                  />
                )}
              />
            </div>
            <div>
              <label>E-mail</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={style.button2}>
              <label>Пароль</label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Скрыть пароль" : "Показать пароль"}
                </button>
              </div>
            </div>
          </div>
          <div className={style.buttons2}>
            <button onClick={handleSave}>Сохранить изменения</button>
            <button onClick={handleEditToggle}>Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonAcc;
