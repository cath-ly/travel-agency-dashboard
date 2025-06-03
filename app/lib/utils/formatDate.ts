import dayjs from "dayjs";

const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("MMMM DD, YYYY");
};

export default formatDate;
