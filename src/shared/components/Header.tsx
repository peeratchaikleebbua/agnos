import Image from "next/image";
import React from "react";

interface IHeader {
  label: string;
  image?: string;
}

const Header = ({ image, label }: IHeader) => {
  return (
    <div className="flex flex-row justify-center items-center my-4">
      {image && (
        <Image
          src={image}
          alt={`${label} Image`}
          width={100}
          height={100}
        />
      )}
      <div className="font-bold md:text-2xl xs:text-sm py-3 text-blue-500">{label}</div>
    </div>
  );
};

export default Header;
