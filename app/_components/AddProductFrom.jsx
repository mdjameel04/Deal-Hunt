"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { AuthModal } from "./AuthModal";
import { Loader2 } from "lucide-react";
import { addProduct } from "../action";
import { toast } from "sonner";

const AddProductFrom = ({user}) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      setShowAuthModal(true)
      return;
    }
    setLoading(true)

     const formData = new FormData();
     formData.append("url", url);

     const result = await addProduct(formData);
     if (result.error) {
      toast.error(result.error)
     } else {
      toast.success(result.message || "product tracked succesfully!")
      setUrl("")
     }
     setLoading(false)
  };
  return (
    <>
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="url"
          value={url}
          placeholder="paste product url (Amazon,mitra, etc )"
          onChange={(e) => setUrl(e.target.value)}
          className="h-12 text-base"
          required
          disabled={loading}
        />

        <Button   type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 h-10 sm:h-12 px-8"
            size="lg">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Track Price"
          )}
        </Button>
      </div>
    </form>

   {/* auth Modal */}
<AuthModal
     isopen={showAuthModal}
     onclose={()=>setShowAuthModal(false)}
     />
    </>
  );
};

export default AddProductFrom;
