import React from "react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { addDays, format } from "date-fns";

export default function LoanForm({ books, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState({
    book_id: "",
    borrower_name: "",
    borrower_id: "",
    loan_date: format(new Date(), "yyyy-MM-dd"),
    due_date: format(addDays(new Date(), 14), "yyyy-MM-dd"),
    status: "פעיל"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>השאלת ספר</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">ספר</label>
            <Select
              required
              value={formData.book_id}
              onValueChange={(value) => setFormData({ ...formData, book_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="בחר ספר" />
              </SelectTrigger>
              <SelectContent>
                {books.map((book) => (
                  <SelectItem key={book.id} value={book.id}>
                    {book.title} - {book.author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">שם השואל</label>
            <Input
              required
              value={formData.borrower_name}
              onChange={(e) => setFormData({ ...formData, borrower_name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">תעודת זהות</label>
            <Input
              required
              value={formData.borrower_id}
              onChange={(e) => setFormData({ ...formData, borrower_id: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">תאריך השאלה</label>
              <Input
                type="date"
                required
                value={formData.loan_date}
                onChange={(e) => setFormData({ ...formData, loan_date: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">תאריך החזרה</label>
              <Input
                type="date"
                required
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              ביטול
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              השאלה
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}