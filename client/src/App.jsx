import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
const App = () => {
  return (
    <div>
      <Toaster richColors position="top-center" />
      <AppRoutes />
    </div>
  );
};
export default App;
