import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Resizer from "react-image-file-resizer";
import { UploadImages } from "../../api/createProducts";
import useEcomStore from "../../store/ecom-store";

const Uploadfile = ({ form, setForm }) => {
  // code
  const token = useEcomStore((state) => state.token);
  const [isLoading, SetIsLoading] = useState(false);
  // Handle
  const handleChangeImages = (e) => {
    const files = e.target.files;
    if (files) {
      SetIsLoading(true);
      let allFiles = form.images; // [] empty array
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Validate Type
        if (!file.type.startsWith("image/")) {
          toast.warning(`Picture ${form.name} not input!  `);
          continue;
        }
        // Resize & Upload
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // Endpoint Back-End
            UploadImages(token, data)
              .then((res) => {
                allFiles.push(res.data.uploadResult);
                console.log(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success("Upload Success");
              })
              .catch((error) => {
                console.log(error);
                toast.error("Upload Failed");
              });
          },
          "base64"
        );
      }
    }
  };
  return (
    <>
      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Product Images
        </label>
        <label className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition cursor-pointer">
          <ImageIcon className="w-8 h-8 mb-2" />
          <input
            type="file"
            name="images"
            onChange={handleChangeImages}
            className="hidden"
          ></input>
          <span className="text-sm">Click to upload image (Not active)</span>
        </label>
      </div>
    </>
  );
};
export default Uploadfile;
