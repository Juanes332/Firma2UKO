import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { AuthProvider } from "contexts/JWTAuthContext";
import SettingsProvider from "contexts/SettingsContext";
import TitleContextProvider from "contexts/TitleContext";
import "pure-react-carousel/dist/react-carousel.es.css";
import { ReactNode } from "react";
import "react-image-lightbox/style.css";
import "simplebar/dist/simplebar.min.css";
import "./__fakeApi__";

type RootAppProviderProps = { children: ReactNode };

const RootAppProvider = ({ children }: RootAppProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <SettingsProvider>
          <TitleContextProvider>{children}</TitleContextProvider>
        </SettingsProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
};

export default RootAppProvider;
