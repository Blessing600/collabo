import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
    return <div className="bg-white relative border-e-2" style={{width: "257px", height: "100vh"}}>
    <Image src="/images/logo.png" alt="Company's logo" width={164} height={58} className="mt-4 ms-12 my-12" />
    <div className="flex flex-col gap-5 ms-10">
        <Link href="/homepage/dashboard" className="flex flex-row gap-2 hover:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.92955 4.46984C7.65833 4.32776 6.34242 4.32776 5.0712 4.46984C4.76231 4.50436 4.51872 4.74895 4.48397 5.04601C4.33217 6.34395 4.33217 7.65516 4.48397 8.9531C4.51872 9.25016 4.76231 9.49475 5.0712 9.52927C6.34242 9.67135 7.65833 9.67135 8.92955 9.52927C9.23844 9.49475 9.48203 9.25016 9.51678 8.9531C9.66858 7.65516 9.66858 6.34395 9.51678 5.04601C9.48203 4.74895 9.23844 4.50436 8.92955 4.46984ZM4.90459 2.97912C6.28654 2.82467 7.71421 2.82467 9.09616 2.97912C10.087 3.08986 10.8894 3.86985 11.0066 4.87176C11.172 6.28547 11.172 7.71364 11.0066 9.12735C10.8894 10.1293 10.087 10.9093 9.09616 11.02C7.71421 11.1744 6.28654 11.1744 4.90459 11.02C3.91375 10.9093 3.11131 10.1293 2.99413 9.12735C2.82878 7.71364 2.82878 6.28547 2.99413 4.87176C3.11131 3.86985 3.91375 3.08986 4.90459 2.97912Z" fill="#252530"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.92955 14.4698C7.65833 14.3278 6.34242 14.3278 5.0712 14.4698C4.76231 14.5044 4.51872 14.749 4.48397 15.046C4.33217 16.344 4.33217 17.6552 4.48397 18.9531C4.51872 19.2502 4.76231 19.4948 5.0712 19.5293C6.34242 19.6714 7.65833 19.6714 8.92955 19.5293C9.23844 19.4948 9.48203 19.2502 9.51678 18.9531C9.66858 17.6552 9.66858 16.344 9.51678 15.046C9.48203 14.749 9.23844 14.5044 8.92955 14.4698ZM4.90459 12.9791C6.28654 12.8247 7.71421 12.8247 9.09616 12.9791C10.087 13.0899 10.8894 13.8698 11.0066 14.8718C11.172 16.2855 11.172 17.7136 11.0066 19.1274C10.8894 20.1293 10.087 20.9093 9.09616 21.02C7.71421 21.1744 6.28654 21.1744 4.90459 21.02C3.91375 20.9093 3.11131 20.1293 2.99413 19.1274C2.82878 17.7136 2.82878 16.2855 2.99413 14.8718C3.11131 13.8699 3.91375 13.0899 4.90459 12.9791Z" fill="#252530"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M18.9295 4.46984C17.6583 4.32776 16.3424 4.32776 15.0712 4.46984C14.7623 4.50436 14.5187 4.74895 14.484 5.04601C14.3322 6.34395 14.3322 7.65516 14.484 8.9531C14.5187 9.25016 14.7623 9.49475 15.0712 9.52927C16.3424 9.67135 17.6583 9.67135 18.9295 9.52927C19.2384 9.49475 19.482 9.25016 19.5168 8.9531C19.6686 7.65516 19.6686 6.34395 19.5168 5.04601C19.482 4.74895 19.2384 4.50436 18.9295 4.46984ZM14.9046 2.97912C16.2865 2.82467 17.7142 2.82467 19.0962 2.97912C20.087 3.08986 20.8894 3.86985 21.0066 4.87176C21.172 6.28547 21.172 7.71364 21.0066 9.12735C20.8894 10.1293 20.087 10.9093 19.0962 11.02C17.7142 11.1744 16.2865 11.1744 14.9046 11.02C13.9138 10.9093 13.1113 10.1293 12.9941 9.12735C12.8288 7.71364 12.8288 6.28547 12.9941 4.87176C13.1113 3.86985 13.9138 3.08986 14.9046 2.97912Z" fill="#252530"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M18.9295 14.4698C17.6583 14.3278 16.3424 14.3278 15.0712 14.4698C14.7623 14.5044 14.5187 14.749 14.484 15.046C14.3322 16.344 14.3322 17.6552 14.484 18.9531C14.5187 19.2502 14.7623 19.4948 15.0712 19.5293C16.3424 19.6714 17.6583 19.6714 18.9295 19.5293C19.2384 19.4948 19.482 19.2502 19.5168 18.9531C19.6686 17.6552 19.6686 16.344 19.5168 15.046C19.482 14.749 19.2384 14.5044 18.9295 14.4698ZM14.9046 12.9791C16.2865 12.8247 17.7142 12.8247 19.0962 12.9791C20.087 13.0899 20.8894 13.8698 21.0066 14.8718C21.172 16.2855 21.172 17.7136 21.0066 19.1274C20.8894 20.1293 20.087 20.9093 19.0962 21.02C17.7142 21.1744 16.2865 21.1744 14.9046 21.02C13.9138 20.9093 13.1113 20.1293 12.9941 19.1274C12.8288 17.7136 12.8288 16.2855 12.9941 14.8718C13.1113 13.8699 13.9138 13.0899 14.9046 12.9791Z" fill="#252530"/>
            </svg>
            <span>Dashboard</span>
        </Link>
        <Link href="/homepage/airspace" className="flex flex-row gap-2 hover:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5579 5.53472C12.6873 4.69936 11.3128 4.69936 10.4422 5.53472L5.8158 9.97405C5.70245 10.0828 5.6262 10.2245 5.59787 10.379C5.04373 13.4009 5.00283 16.4945 5.47687 19.53L5.58939 20.2505H8.56585V14.0391C8.56585 13.6249 8.90164 13.2891 9.31585 13.2891H14.6843C15.0985 13.2891 15.4343 13.6249 15.4343 14.0391V20.2505H18.4107L18.5232 19.53C18.9973 16.4945 18.9564 13.4009 18.4023 10.379C18.3739 10.2245 18.2977 10.0828 18.1843 9.97406L13.5579 5.53472ZM9.40369 4.4524C10.8546 3.06014 13.1455 3.06014 14.5964 4.4524L19.2229 8.89174C19.5634 9.21853 19.7925 9.64422 19.8777 10.1085C20.4622 13.2961 20.5053 16.5594 20.0053 19.7614L19.8245 20.9189C19.7498 21.3976 19.3375 21.7505 18.853 21.7505H14.6843C14.2701 21.7505 13.9343 21.4147 13.9343 21.0005V14.7891H10.0659V21.0005C10.0659 21.4147 9.73007 21.7505 9.31585 21.7505H5.14712C4.66264 21.7505 4.25035 21.3976 4.1756 20.9189L3.99484 19.7614C3.49479 16.5594 3.53794 13.2961 4.12247 10.1085C4.2076 9.64422 4.43668 9.21853 4.77725 8.89173L9.40369 4.4524Z" fill="#252530"/>
            </svg>
            <span>Airspace</span>
        </Link>
        <Link href="/homepage/uavs" className="flex flex-row gap-2 hover:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 9.50028C7.30964 9.50028 6.75 10.0599 6.75 10.7503C6.75 11.4406 7.30964 12.0003 8 12.0003C8.69036 12.0003 9.25 11.4406 9.25 10.7503C9.25 10.0599 8.69036 9.50028 8 9.50028Z" fill="#252530"/>
                <path d="M12 9.50028C11.3096 9.50028 10.75 10.0599 10.75 10.7503C10.75 11.4406 11.3096 12.0003 12 12.0003C12.6904 12.0003 13.25 11.4406 13.25 10.7503C13.25 10.0599 12.6904 9.50028 12 9.50028Z" fill="#252530"/>
                <path d="M14.75 10.7503C14.75 10.0599 15.3096 9.50028 16 9.50028C16.6904 9.50028 17.25 10.0599 17.25 10.7503C17.25 11.4406 16.6904 12.0003 16 12.0003C15.3096 12.0003 14.75 11.4406 14.75 10.7503Z" fill="#252530"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16.1007 4.59307C13.4065 4.36331 10.6983 4.34998 8.00194 4.5532L7.80871 4.56776C5.23741 4.76156 3.25 6.90439 3.25 9.48299V18.0003C3.25 18.2642 3.38867 18.5086 3.61515 18.644C3.84163 18.7794 4.12261 18.7858 4.35504 18.6609L8.26583 16.5592C8.44774 16.4615 8.65104 16.4103 8.85756 16.4103H17.834C18.9661 16.4103 19.9362 15.6009 20.1392 14.4871C20.5505 12.2299 20.5829 9.91994 20.2353 7.65203L20.1329 6.98371C19.9464 5.76696 18.951 4.83614 17.7245 4.73155L16.1007 4.59307ZM8.11468 6.04896C10.731 5.85176 13.359 5.8647 15.9733 6.08765L17.597 6.22612C18.1334 6.27186 18.5686 6.6789 18.6502 7.21097L18.7526 7.8793C19.075 9.98259 19.0449 12.1249 18.6635 14.2183C18.5904 14.619 18.2413 14.9103 17.834 14.9103H8.85756C8.40322 14.9103 7.95596 15.0229 7.55575 15.2379L4.75 16.7458V9.48299C4.75 7.68909 6.13262 6.19834 7.92144 6.06352L8.11468 6.04896Z" fill="#252530"/>
            </svg>
            <span>UAVs</span>
        </Link>
        <Link href="/homepage/wallet" className="flex flex-row gap-2 hover:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15.4995 12.0006C15.4995 11.1722 16.171 10.5006 16.9995 10.5006C17.8279 10.5006 18.4995 11.1722 18.4995 12.0006C18.4995 12.829 17.8279 13.5006 16.9995 13.5006C16.171 13.5006 15.4995 12.829 15.4995 12.0006Z" fill="#252530"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M20.4408 6.67463C19.783 5.12897 18.3296 4.01784 16.6001 3.83584L15.9483 3.76725C12.6559 3.42079 9.3352 3.44364 6.04796 3.83536L5.61602 3.88683C3.94722 4.08569 2.62497 5.3895 2.40269 7.05534C1.96473 10.3377 1.96473 13.6636 2.40269 16.9459C2.62497 18.6117 3.94722 19.9156 5.61602 20.1144L6.04796 20.1659C9.3352 20.5576 12.6559 20.5805 15.9483 20.234L16.6001 20.1654C18.3296 19.9834 19.783 18.8723 20.4408 17.3266C21.4801 17.0172 22.2732 16.1162 22.4034 15.003C22.6367 13.0082 22.6367 10.993 22.4034 8.99825C22.2732 7.88503 21.4801 6.98405 20.4408 6.67463ZM15.7913 5.25901C12.6102 4.92426 9.40163 4.94634 6.22545 5.32482L5.79351 5.37629C4.80469 5.49412 4.02122 6.26667 3.88952 7.25373C3.46912 10.4044 3.46912 13.5969 3.88952 16.7475C4.02122 17.7346 4.8047 18.5071 5.79351 18.625L6.22545 18.6764C9.40164 19.0549 12.6102 19.077 15.7913 18.7422L16.4431 18.6736C17.2937 18.5841 18.0463 18.1649 18.5678 17.5426C17.0596 17.6305 15.5314 17.5912 14.0412 17.4247C12.7718 17.2828 11.7453 16.2833 11.5955 15.003C11.3622 13.0082 11.3622 10.993 11.5955 8.99825C11.7453 7.71799 12.7718 6.71845 14.0412 6.57658C15.5314 6.41003 17.0596 6.37073 18.5678 6.45867C18.0463 5.83636 17.2937 5.41711 16.4431 5.32761L15.7913 5.25901ZM19.2768 8.01532C19.2774 8.01916 19.278 8.023 19.2786 8.02684L19.2847 8.06572L19.4833 8.03487C19.5861 8.04505 19.6887 8.05585 19.7911 8.0673C20.3785 8.13295 20.8463 8.59709 20.9136 9.1725C21.1334 11.0515 21.1334 12.9497 20.9136 14.8287C20.8463 15.4042 20.3785 15.8683 19.7911 15.9339C19.6887 15.9454 19.5861 15.9562 19.4833 15.9664L19.2847 15.9355L19.2786 15.9744C19.278 15.9782 19.2774 15.9821 19.2768 15.9859C17.5982 16.1378 15.8766 16.1205 14.2078 15.9339C13.6204 15.8683 13.1527 15.4042 13.0854 14.8287C12.8656 12.9497 12.8656 11.0515 13.0854 9.1725C13.1527 8.59709 13.6204 8.13295 14.2078 8.0673C15.8766 7.88078 17.5982 7.86346 19.2768 8.01532Z" fill="#252530"/>
            </svg>
            <span>Wallet</span>
        </Link>
        <Link href="/homepage/settings" className="flex flex-row gap-2 hover:gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.0003 3.07848L9.78746 5.36798C9.55194 5.61167 9.22755 5.74928 8.88865 5.74928H5.75026V8.88767C5.75026 9.22658 5.61265 9.55096 5.36896 9.78648L3.07946 11.9993L5.36896 14.2121C5.61265 14.4476 5.75026 14.772 5.75026 15.1109V18.2493H8.88865C9.22755 18.2493 9.55193 18.3869 9.78746 18.6306L12.0003 20.9201L14.2131 18.6306C14.4486 18.3869 14.773 18.2493 15.1119 18.2493H18.2503V15.1109C18.2503 14.772 18.3879 14.4476 18.6316 14.2121L20.9211 11.9993L18.6316 9.78649C18.3879 9.55096 18.2503 9.22658 18.2503 8.88768V5.74928H15.1119C14.773 5.74928 14.4486 5.61167 14.2131 5.36798L12.0003 3.07848ZM11.1014 1.85005C11.5928 1.34165 12.4077 1.34165 12.8991 1.85005L15.2179 4.24928H18.5003C19.1906 4.24928 19.7503 4.80893 19.7503 5.49928V8.78162L22.1495 11.1005C22.6579 11.5918 22.6579 12.4067 22.1495 12.8981L19.7503 15.2169V18.4993C19.7503 19.1896 19.1906 19.7493 18.5003 19.7493H15.2179L12.8991 22.1485C12.4077 22.6569 11.5928 22.6569 11.1014 22.1485L8.78259 19.7493H5.50026C4.8099 19.7493 4.25026 19.1896 4.25026 18.4993V15.217L1.85103 12.8981C1.34263 12.4067 1.34263 11.5918 1.85103 11.1005L4.25026 8.78162V5.49928C4.25026 4.80893 4.80991 4.24928 5.50026 4.24928H8.78259L11.1014 1.85005Z" fill="#252530"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.25026 11.9993C7.25026 9.37593 9.37691 7.24928 12.0003 7.24928C14.6236 7.24928 16.7503 9.37593 16.7503 11.9993C16.7503 14.6226 14.6236 16.7493 12.0003 16.7493C9.37691 16.7493 7.25026 14.6226 7.25026 11.9993ZM12.0003 8.74928C10.2053 8.74928 8.75026 10.2044 8.75026 11.9993C8.75026 13.7942 10.2053 15.2493 12.0003 15.2493C13.7952 15.2493 15.2503 13.7942 15.2503 11.9993C15.2503 10.2044 13.7952 8.74928 12.0003 8.74928Z" fill="#252530"/>
            </svg>
            <span>Settings</span>
        </Link>
    </div>
    <button className="absolute bottom-20 ms-10 flex flex-row gap-2 hover:gap-3 hover:text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 18.25C11.5858 18.25 11.25 18.5858 11.25 19C11.25 19.4142 11.5858 19.75 12 19.75H18C18.9665 19.75 19.75 18.9665 19.75 18V6C19.75 5.0335 18.9665 4.25 18 4.25H12C11.5858 4.25 11.25 4.58579 11.25 5C11.25 5.41421 11.5858 5.75 12 5.75L18 5.75C18.1381 5.75 18.25 5.86193 18.25 6L18.25 18C18.25 18.1381 18.1381 18.25 18 18.25H12Z" fill="#252530"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.5031 14.3652C15.1934 14.3652 15.7531 13.8056 15.7531 13.1152V10.8747C15.7531 10.1843 15.1934 9.6247 14.5031 9.6247L9.89048 9.6247C9.88396 9.55128 9.87713 9.47787 9.87 9.40448L9.81597 8.8486C9.73354 8.00049 8.83294 7.49258 8.06451 7.86084C6.43029 8.64403 4.95085 9.71578 3.69736 11.0245L3.59816 11.1281C3.13395 11.6128 3.13395 12.3771 3.59815 12.8618L3.69736 12.9654C4.95085 14.2741 6.43029 15.3459 8.06451 16.1291C8.83293 16.4973 9.73354 15.9894 9.81597 15.1413L9.87 14.5854C9.87713 14.512 9.88396 14.4386 9.89048 14.3652H14.5031ZM9.19511 12.8652C8.92874 12.8652 8.69326 13.0045 8.56008 13.216C8.49523 13.319 8.45464 13.4391 8.44656 13.5685C8.42842 13.8594 8.40524 14.15 8.37703 14.4403L8.36135 14.6017C7.3253 14.0677 6.36316 13.4028 5.49838 12.6239C5.27402 12.4218 5.05622 12.2121 4.84538 11.995C5.86892 10.9409 7.05651 10.0607 8.36135 9.38824L8.37703 9.54959C8.40524 9.83987 8.42842 10.1305 8.44656 10.4214C8.47122 10.8167 8.79902 11.1247 9.19511 11.1247H14.2531V12.8652H9.19511Z" fill="#252530"/>
        </svg>
        <span>Log Out</span>
    </button>
</div>
}

export default Sidebar;