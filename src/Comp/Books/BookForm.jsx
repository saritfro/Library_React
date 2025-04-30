
import React from "react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

export default function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState(book || {
    bookName: "",
    publishingDate: new Date().toISOString().split("T")[0],
    publisher: "",
    category: "אנגלית"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{book ? 'עריכת ספר' : 'הוספת ספר חדש'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">שם הספר</label>
            <Input
              required
              value={formData.bookName}
              onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">שם הסופר</label>
            <Input
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">הוצאה לאור</label>
            <Input
              value={formData.publisher}
              onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">מספר עותקים</label>
            <Input
              value={formData.copiesNum}
              onChange={(e) => setFormData({ ...formData, copiesNum: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">תאריך פרסום</label>
            <Input
              type="date"
              value={formData.publishingDate}
              onChange={(e) => setFormData({ ...formData, publishingDate: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">קטגוריה</label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
              {["אנגלית", "פעוטות", "ילדים", "נוער", "מבוגר", "שואה", "עיוני"].map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              ביטול
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {book ? 'עדכון' : 'הוספה'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
