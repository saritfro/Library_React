import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
// import { label } from "../../components/ui/label";

export default function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState(
    user || {
      userId: "",
      firstName:"",
      lastName: "",
      subscriptionQuantity: ""
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="bg-white max-w-xl rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {user ? "עריכת משתמש" : "הוספת משתמש חדש"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* שם המשתמש */}
          <div className="space-y-1">
            <label>קוד </label>
            <Input
              required
              value={formData.userId}
              onChange={(e) =>
                setFormData({ ...formData, userId: e.target.value })
              }
            />
          </div>

          {/* שם הסופר */}
          <div className="space-y-1">
            <label>שם</label>
            <Input
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>

          {/* הוצאה לאור */}
          <div className="space-y-1">
            <label>משפחה</label>
            <Input
                      value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          {/* ממשתמש עותקים */}
          <div className="space-y-1">
            <label>מס' מנויים</label>
            <Input
              type="number"
              value={formData.subscriptionQuantity}
              onChange={(e) =>
                setFormData({ ...formData, subscriptionQuantity: e.target.value })
              }
            />
          </div>


          {/* כפתורים */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="rounded-xl"
            >
              ביטול
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              {user ? "עדכון" : "הוספה"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
