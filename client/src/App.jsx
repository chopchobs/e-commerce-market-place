import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
const App = () => {
  return (
    <div>
      <Toaster richColors position="top-right" />
      <AppRoutes />
    </div>
  );
};
export default App;
