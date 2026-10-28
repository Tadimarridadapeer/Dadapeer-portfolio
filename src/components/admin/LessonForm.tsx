export { LessonForm } from "@/admin/components/LessonForm";
export default function LessonFormWrapper(props: any) {
  const { LessonForm } = require("@/admin/components/LessonForm");
  return <LessonForm {...props} />;
}
