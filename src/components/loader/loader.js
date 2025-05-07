export default function Loader({ className = "" }) {
  return (
    <div className={className}>
      <div className="position-relative d-flex align-items-center justify-content-center my-4 py-4 h-100">
        <svg
          id="loading-spinner"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_21_2)">
            <path
              d="M37.8388 0H6.16117C2.75845 0 0 2.75845 0 6.16117V37.8388C0 41.2416 2.75845 44 6.16117 44H37.8388C41.2416 44 44 41.2416 44 37.8388V6.16117C44 2.75845 41.2416 0 37.8388 0Z"
              fill="#1E3A8A"
            />
          </g>
          <defs>
            <clipPath id="clip0_21_2">
              <rect width="44" height="44" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg
          className="loading-spinner-child"
          width="30"
          height="29"
          viewBox="0 0 30 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.4878 0.86587C13.8629 -0.288623 15.4963 -0.288623 15.8714 0.86587L18.4777 8.88729C18.6455 9.40358 19.1266 9.75315 19.6695 9.75315H28.1037C29.3177 9.75315 29.8224 11.3065 28.8403 12.0201L22.0169 16.9776C21.5777 17.2967 21.3939 17.8623 21.5616 18.3786L24.168 26.4C24.5431 27.5546 23.2217 28.5146 22.2396 27.801L15.4162 22.8435C14.977 22.5245 14.3823 22.5245 13.9431 22.8435L7.11964 27.801C6.13754 28.5146 4.81619 27.5546 5.1913 26.4L7.79761 18.3786C7.96537 17.8623 7.78158 17.2967 7.34239 16.9776L0.518966 12.0201C-0.463131 11.3065 0.0415856 9.75315 1.25553 9.75315H9.68975C10.2326 9.75315 10.7138 9.40358 10.8815 8.88729L13.4878 0.86587Z"
            fill="#D9D9D9"
          />
        </svg>
      </div>
    </div>
  );
}
