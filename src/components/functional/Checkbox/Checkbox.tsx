import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from "./Checkbox.module.scss";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
};

const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }

    const finalInputClassName = `${s.checkbox} ${className ? className : ""}`;

    return (
        <label className={s.checkboxCustom}>
            <input
                type={"checkbox"}
                onChange={onChangeCallback}
                className={finalInputClassName}

                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            <span className={s.spanClassName}>{children}</span> {/* Убрал проверку на наличие children так как у меня стили кастомного чекбокса привязаны к лейблу и если не будет спана то не будет и чкбокса */}
        </label> // благодаря label нажатие на спан передастся в инпут
    );
}

export default Checkbox;
