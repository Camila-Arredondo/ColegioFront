import InputMask from "react-input-mask";

export function TextBoxCurso(props) {
  const { titulo, type, name, formik, placeholder, mask } = props;

  return (
    <div className="w-full sm:max-w-xs">
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {titulo}
        </label>
      <div>


{type == "mask" ? <InputMask
          mask={mask}
          maskPlaceholder=""
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            formik?.touched[name] && formik?.errors[name]
              ? "border-red-500"
              : ""
          }`}
          {...formik?.getFieldProps(name)}
          placeholder={placeholder}
        ></InputMask> : 
        
        <input
          type={type}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            formik?.touched[name] && formik?.errors[name]
              ? "border-red-500"
              : ""
          }`}
          {...formik?.getFieldProps(name)}
          placeholder={placeholder}
        />
        } 
        




            {formik?.touched[name] && formik?.errors[name] && (
          <div className="text-red-500 text-sm mt-1">{formik?.errors[name]}</div>
        )}
      </div>
    </div>
  );
}
