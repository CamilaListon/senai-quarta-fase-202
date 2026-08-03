type ButtonType = {
  title: string;
  variant?: "default" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ title, variant="default", ...props }: ButtonType) => {

  const buttonVariant = () =>{
    if(variant === "default"){
      return "w-full rounded-md border-2 bg-[#C92A0E] border-[#C92A0E] py-2 text-sm text-white cursor-pointer"
    } else if (variant === "outline"){
      return "w-full rounded-md bg-white border-2 border-[#C92A0E] py-2 text-sm text-[#C92A0E] cursor-pointer"
    } 
  };

  return (
    <button {...props} className={buttonVariant()}>
      {title}
    </button>
  );
};

export default Button;