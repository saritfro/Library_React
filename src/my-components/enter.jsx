// // // ctrl + I =gpt!!!
// // import { Button } from "@/components/ui/button"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"

// // export default function DialogDemo() {
// //   return (
// //     <Dialog>
// //       <DialogTrigger asChild>
// //         <Button variant="outline">Edit Profile</Button>
// //       </DialogTrigger>
// //       <DialogContent className="sm:max-w-[425px]">
// //         <DialogHeader>
// //           <DialogTitle>Edit profile</DialogTitle>
// //           <DialogDescription>
// //             Make changes to your profile here. Click save when you're done.
// //           </DialogDescription>
// //         </DialogHeader>
// //         <div className="grid gap-4 py-4">
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label htmlFor="name" className="text-right">
// //               Name
// //             </Label>
// //             <Input id="name" value="Pedro Duarte" className="col-span-3" />
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label htmlFor="username" className="text-right">
// //               Username
// //             </Label>
// //             <Input id="username" value="@peduarte" className="col-span-3" />
// //           </div>
// //         </div>
// //         <DialogFooter>
// //           <Button type="submit">Save changes</Button>
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }


// import React from "react";
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
// import { addDays, format } from "date-fns";

// export default function LoanForm({ books, onSubmit, onCancel }) {
//   const [formData, setFormData] = React.useState({
//     book_id: "",
//     borrower_name: "",
//     borrower_id: "",
//     loan_date: format(new Date(), "yyyy-MM-dd"),
//     due_date: format(addDays(new Date(), 14), "yyyy-MM-dd"),
//     status: "פעיל"
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Dialog open={true} onOpenChange={onCancel}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>השאלת ספר</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="text-sm font-medium">ספר</label>
//             <Select
//               required
//               value={formData.book_id}
//               onValueChange={(value) => setFormData({ ...formData, book_id: value })}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="בחר ספר" />
//               </SelectTrigger>
//               <SelectContent>
//                 {books.map((book) => (
//                   <SelectItem key={book.id} value={book.id}>
//                     {book.title} - {book.author}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <label className="text-sm font-medium">שם השואל</label>
//             <Input
//               required
//               value={formData.borrower_name}
//               onChange={(e) => setFormData({ ...formData, borrower_name: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium">תעודת זהות</label>
//             <Input
//               required
//               value={formData.borrower_id}
//               onChange={(e) => setFormData({ ...formData, borrower_id: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium">תאריך השאלה</label>
//               <Input
//                 type="date"
//                 required
//                 value={formData.loan_date}
//                 onChange={(e) => setFormData({ ...formData, loan_date: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">תאריך החזרה</label>
//               <Input
//                 type="date"
//                 required
//                 value={formData.due_date}
//                 onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-4">
//             <Button type="button" variant="outline" onClick={onCancel}>
//               ביטול
//             </Button>
//             <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
//               השאלה
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }



import React from "react";
import { Button } from "../components/ui/button";
// import { Button } from '../../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

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
