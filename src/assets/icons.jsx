export const DarkModeIcon = ({ handleClick }) => {
  return (
    <svg
      onClick={handleClick}
      className="cursor-pointer"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18C6.5 18 4.375 17.125 2.625 15.375C0.875 13.625 0 11.5 0 9C0 6.5 0.875 4.375 2.625 2.625C4.375 0.875 6.5 0 9 0C9.23333 0 9.4625 0.00833333 9.6875 0.025C9.9125 0.0416667 10.1333 0.0666667 10.35 0.1C9.66667 0.583333 9.12083 1.2125 8.7125 1.9875C8.30417 2.7625 8.1 3.6 8.1 4.5C8.1 6 8.625 7.275 9.675 8.325C10.725 9.375 12 9.9 13.5 9.9C14.4167 9.9 15.2583 9.69583 16.025 9.2875C16.7917 8.87917 17.4167 8.33333 17.9 7.65C17.9333 7.86667 17.9583 8.0875 17.975 8.3125C17.9917 8.5375 18 8.76667 18 9C18 11.5 17.125 13.625 15.375 15.375C13.625 17.125 11.5 18 9 18ZM9 16C10.4667 16 11.7833 15.5958 12.95 14.7875C14.1167 13.9792 14.9667 12.925 15.5 11.625C15.1667 11.7083 14.8333 11.775 14.5 11.825C14.1667 11.875 13.8333 11.9 13.5 11.9C11.45 11.9 9.70417 11.1792 8.2625 9.7375C6.82083 8.29583 6.1 6.55 6.1 4.5C6.1 4.16667 6.125 3.83333 6.175 3.5C6.225 3.16667 6.29167 2.83333 6.375 2.5C5.075 3.03333 4.02083 3.88333 3.2125 5.05C2.40417 6.21667 2 7.53333 2 9C2 10.9333 2.68333 12.5833 4.05 13.95C5.41667 15.3167 7.06667 16 9 16Z"
        fill="#1D1B20"
      />
    </svg>
  );
};

export const LightModeIcon = ({ handleClick }) => {
  return (
    <svg
      style={{ transform: "translateY(2px)" }}
      onClick={handleClick}
      className="cursor-pointer"
      width="24"
      height="24"
      viewBox="0 0 53 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_132_4349)">
        <path
          d="M26.7052 22.0001C28.3513 24.0001 29.7506 23.514 30.9029 22.5417C32.0553 21.5695 32.6314 20.389 32.6314 19.0001C32.6314 17.6112 32.0553 16.4306 30.9029 15.4584C29.7506 14.4862 28.3513 14.0001 26.7052 14.0001C25.059 14.0001 23.6597 14.4862 22.5074 15.4584C21.3551 16.4306 20.7789 17.6112 20.7789 19.0001C20.7789 20.389 21.3551 21.5695 22.5074 22.5417C23.6597 23.514 25.059 24.0001 26.7052 24.0001ZM26.7052 27.3334C23.9725 27.3334 21.6432 26.5209 19.7171 24.8959C17.7911 23.2709 16.8281 21.3056 16.8281 19.0001C16.8281 16.6945 17.7911 14.7292 19.7171 13.1042C21.6432 11.4792 23.9725 10.6667 26.7052 10.6667C29.4378 10.6667 31.7672 11.4792 33.6932 13.1042C35.6192 14.7292 36.5822 16.6945 36.5822 19.0001C36.5822 21.3056 35.6192 23.2709 33.6932 24.8959C31.7672 26.5209 29.4378 27.3334 26.7052 27.3334ZM12.8773 20.6667H4.97559V17.3334H12.8773V20.6667ZM48.4347 20.6667H40.5331V17.3334H48.4347V20.6667ZM24.7297 7.33341V0.666748H28.6806V7.33341H24.7297ZM24.7297 37.3334V30.6667H28.6806V37.3334H24.7297ZM15.6428 11.9167L10.6549 7.87508L13.4699 5.41675L18.2109 9.58341L15.6428 11.9167ZM39.9405 32.5834L35.1501 28.3751L37.7675 26.0834L42.7554 30.1251L39.9405 32.5834ZM35.1007 9.66675L39.8911 5.45841L42.8048 7.83341L37.8663 11.8334L35.1007 9.66675ZM10.6055 30.1667L15.5934 26.1251L18.3096 28.3334L13.5193 32.5417L10.6055 30.1667Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_132_4349"
          x="0.975586"
          y="0.666748"
          width="51.459"
          height="44.6667"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_132_4349"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_132_4349"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
