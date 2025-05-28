import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../components/ui/select";

//מסננים

export default function BookFilters({ filters, setFilters }) {
  return (
    <div className="flex gap-4">
      <Select
        value={filters.category}
        onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
      >
        <SelectTrigger className="w-[150px] bg-white">
          <SelectValue placeholder="קטגוריה" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-md" >
          <SelectItem value="הכל">כל הקטגוריות</SelectItem>
          <SelectItem value="ספרות">ספרות</SelectItem>
          <SelectItem value="מדע">מדע</SelectItem>
          <SelectItem value="היסטוריה">היסטוריה</SelectItem>
          <SelectItem value="ילדים">ילדים</SelectItem>
          <SelectItem value="רומן">רומן</SelectItem>
          <SelectItem value="מתח">מתח</SelectItem>
          <SelectItem value="ביוגרפיה">ביוגרפיה</SelectItem>
          <SelectItem value="אחר">אחר</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
      >
        <SelectTrigger className="w-[150px] bg-white">
          <SelectValue placeholder="סטטוס" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-md" >
          <SelectItem value="הכל">כל הסטטוסים</SelectItem>
          <SelectItem value="זמין">זמין</SelectItem>
          <SelectItem value="מושאל">מושאל</SelectItem>
          <SelectItem value="בתחזוקה">בתחזוקה</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
