export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const controller = new apiDataController();
  const cityList = await controller.getDataApi(Constants.city);
  const seodata: any = await controller.getDataApi(Constants.seo);
  const courselist = await controller.GetApi(Constants.headerCourses);
  const loc = await controller.GetApi("http://ip-api.com/json/");
  const bannerData = await controller.GetApi(Constants.bannerData);

  return (
    <html lang="en">
      {seodata?.scripts && (
        <script dangerouslySetInnerHTML={{ __html: seodata?.scripts }} />
      )}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  w-[100%]  overflow-x-hidden`}
      >
        {/* <ErrorBoundary> */}{" "}
        <Providers>
          {cityList && seodata[0] && courselist && (
            <Header
              cityList={cityList}
              seodata={seodata[0]}
              courselist={courselist}
            />
          )}
          {bannerData && <SocialMediaIcons data={bannerData[0]} />}
          {courselist && <MainForm coursesData={courselist} loc={loc} />}

          <div className=" md:mx-4 mx-0 md:pt-12 overflow-x-hidden w-full">
            {children}
          </div>
          {seodata[0] && (
            <Footer
              address={seodata[0]?.address}
              contact_number={seodata[0]?.contact_number}
              whatsapp_number={seodata[0]?.whatsapp_number}
              location={seodata[0]?.location}
            />
          )}
        </Providers>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
import Providers from "@/store/Providers";
import localFont from "next/font/local";
import Footer from "./components/home/Footer";
import Header from "./components/home/Header";
import "./globals.css";
import MainForm from "./components/home/MainForm";
import ErrorBoundary from "./components/home/ErrorBoundary";
import SocialMediaIcons from "./components/home/TopOffers";
import Banner from "./components/home/Banner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
