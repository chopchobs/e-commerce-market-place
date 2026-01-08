import moment from "moment";
const date = (dateString) => {
  return <div>{moment(dateString).local("en").format("LL")}</div>;
};
export default date;
