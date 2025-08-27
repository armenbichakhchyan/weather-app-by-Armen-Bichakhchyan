
const Input = ({type, value, name, onChange, classname, placeholder}: {type: string, value: string, name: string, onChange: any, classname: string, placeholder: string }) => {
    return (
        <>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={classname}
            />
        </>
    );
};

export default Input;