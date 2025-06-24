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

export default function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState(
    book || {
      bookName: "",
      publishingDate: new Date().toISOString().split("T")[0],
      publisher: "",
      author: "",
      copiesNum: "",
      category: "אנגלית",
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
            {book ? "עריכת ספר" : "הוספת ספר חדש"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* שם הספר */}
          <div className="space-y-1">
            <label>שם הספר</label>
            <Input
              required
              placeholder="לדוגמה: ילדת חלומות"
              value={formData.bookName}
              onChange={(e) =>
                setFormData({ ...formData, bookName: e.target.value })
              }
            />
          </div>
          {/* שם הסופר */}
          <div className="space-y-1">
            <label>שם הסופר</label>
            <Input
              required
              placeholder="לדוגמה: אסתר קווין"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
          </div>
          {/* הוצאה לאור */}
          <div className="space-y-1">
            <label>הוצאה לאור</label>
            <Input
              placeholder="לדוגמה: יפה נוף"
              value={formData.publisher}
              onChange={(e) =>
                setFormData({ ...formData, publisher: e.target.value })
              }
            />
          </div>
          {/* מספר עותקים */}
          <div className="space-y-1">
            <label>מספר עותקים</label>
            <Input
              required
              type="number"
              placeholder="לדוגמה: 5"
              value={formData.copiesNum}
              onChange={(e) =>
                setFormData({ ...formData, copiesNum: e.target.value })
              }
            />
          </div>
          {/* תאריך פרסום */}
          <div className="space-y-1">
            <label>תאריך פרסום</label>
            <Input
              type="date"
              value={formData.publishingDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  publishingDate: e.target.value,
                })
              }
            />
          </div>
          {/* קטגוריה */}
          <div className="space-y-1">
            <label>קטגוריה</label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="בחר קטגוריה" />
              </SelectTrigger>
              <SelectContent>
                {["אנגלית", "פעוטות", "ילדים", "נוער", "מבוגר", "שואה", "עיוני"].map(
                  (category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
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
              {book ? "עדכון" : "הוספה"}
            </Button>ג
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
