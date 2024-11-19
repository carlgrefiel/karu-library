export const text = {
  xsm: "text-[10px]  lg:text-[10px] xl:text-[11px] 2xl:text-[12px]",
  sm: "text-[12px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]",
  md: "text-[14px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]",
  lg: "text-[16px] lg:text-[16px] xl:[17px] 2xl:text-[18px]",
  xl: "text-[18px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]",
  xxl: "text-[20px] lg:text-[20px] xl:text-[21px] 2xl:text-2xl",
};
export const styles = {
  navItem: `flex items-center ${text.md} font-medium text-white hover:text-gray-600 hover:bg-green-300  py-2 px-10 w-full`,
  navItemMobile: `flex items-center ${text.md} font-medium text-white hover:text-gray-600 hover:bg-green-300  py-2 px-2  w-full`,
  footer: "p-2 flex flex-col items-center justify-center text-white",
  header:
    "bg-neatrual-400 h-32 flex items-center justify-between p-4  font-semibold text-white",
  subHeader: `bg-gray-100 h-24 mb-5 flex justify-between items-center ${text.xxl} font-semibold text-gray-600 pl-10`,
  sideBarContainer: "bg-neutral-500 h-auto w-[300px] flex flex-col",
  dashboardHeader: `${text.xxl} text-neutral-400`,

  buttonView:
    "flex items-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg",
  buttonDelete:
    "flex items-center gap-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg",
  buttonAccept:
    "flex items-center gap-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg",
  error: "text-red-500",
  editInputContainer: "flex items-center border rounded-lg my-1",
  inputHeader: `py-2 text-gray-600 ${text.lg}`,
  viewContainer:
    "py-3 flex border border-gray-600  rounded-lg px-3 flex-row items-center  my-1",
  inputContainer: "flex items-center border rounded w-4/6",
  inputIcon: "w-6 h-6 text-green-500 mx-2",
  inputError: `text-red-600 ${text.sm} mt-2`,

  // RSP/pds_form
  containerPds: "flex flex-col gap-2 w-full ",
  labelPds: `flex  font-semibold text-gray-800 ${text.md}`,
  labelHeaderPds: `font-bold ${text.lg} text-green-700`,
  inputDefaultValue: `w-full p-2  text-gray-700 ${text.md}`,
  inputContainerPds: "flex items-center rounded w-full border",
  inputPds: `w-full p-2 bg-transparent outline-none  text-gray-700 ${text.md} text-ellipsis`,
  borderError: "border-red-500 bg-red-50",
  border: "border-gray-300",
  editCloseButtonContainer:
    "flex gap-3 justify-center items-center w-1/2 sm:w-1/3 mr-2 ",
  formDiv: "flex gap-10 px-3 flex-col sm:flex-row",
  form2ndDiv:
    "flex flex-col w-full sm:w-1/2 gap-3 p-5 border border-gray-300 rounded-lg ",
  form3rdDiv: "flex flex-col w-full sm:w-1/2 gap-3 p-5",
  refDiv: "flex flex-col sm:flex-row gap-2",

  //
  tableAction: "flex gap-2 w-[120px] h-[30px]",
  container: "flex justify-between items-center  gap-2 ",

  verified:
    "bg-green-200 flex justify-center rounded-full p-2 px-7 text-green-700",
  pending:
    "bg-orange-200  flex justify-center rounded-full p-2 px-8 text-orange-700",
  new: "bg-yellow-200  flex justify-center rounded-full p-2 px-10  text-yellow-600",

  // ###
  form: "flex flex-col gap-3 w-full py-10 overflow-x-auto overflow-y-auto",
  input: "w-full p-3 bg-transparent outline-none ",
  editLabel: `py-2 text-gray-600 ${text.lg}`,
  label: `${text.lg} font-medium flex text-gray-500`,
  button:
    "w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded",

  // styling for Navigation bar for personal data information
  navItemContainer: "flex flex-col justify-between bg-gray-500  rounded-t-3xl",
  navItemButton: `text-white font-semibold ${text.md} cursor-pointer px-5 py-4 w-full flex`,
  navItemV2: `text-white  font-semibold ${text.md} px-5 py-4 w-full flex`,
  navItemSubContainer: "px-3 py-[2px] bg-white",
  navItemHeader: "flex  justify-between sticky z-10  bg-gray-500 rounded-t-3xl",

  // styling for homepage components
  homeCardContainer:
    "bg-gradient-to-br from-green-300 to-green-700 flex flex-col items-center justify-between shadow-slate-900 shadow-2xl rounded-lg w-[300px] h-[450px] relative",
  homeSpanHeader:
    "font-extrabold font-family:Monaco text-center text-gray-700 mt-16 border-b-2 border-t-2 w-11/12 py-2 mx-auto z-20 border-gray-300",
  homeSpanContent:
    "text-justify font-semibold px-6 py-2 mb-2 text-gray-700 z-20",
  homeLink:
    "w-1/2 text-center bg-gradient-to-tl from-gray-50 to-gray-300 hover:bg-green-700 text-gray-800 font-bold py-1 px-4  rounded mb-5 flex justify-center",

  // other information

  otherSubContainer: "border-2 p-2 rounded w-full sm:w-1/3",

  // checkbox
  labelCheckBox: `flex flex-col sm:flex-row gap-3 ${text.sm}`,

  // admin appointments
  statusAppointment:
    "w-[100px] flex p-2 justify-center text-white font-semibold rounded-lg",
  // modal
  modalOpacityContainer:
    "fixed top-0 left-0 h-screen w-screen bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center",
  modalTextHeader: `${text.xl} w-3/4 sm:w-full sm:text-center text-white font-bold pl-2 sm:pl-10`,
  modalContainerHeader:
    "flex  justify-between items-center bg-gradient-to-br from-green-300 to-green-700 rounded py-1 px-2 ",
  searchSubModal:
    "flex w-11/12 sm:w-1/3 h-3/4 bg-gray-50 px-5  pb-5 rounded-lg border flex-col",

  // inputs

  searchInput: "border rounded-full border-gray-400 px-3 flex",
  tabContainer:
    "my-10 border-2 flex flex-col p-3 rounded-lg  shadow-xl bg-white w-11/12 2xl:w-[1100px] mx-auto ",
  tabContainerApplication:
    "mt-10 border border-gray-300 flex flex-col p-3 rounded-lg  shadow-xl bg-white w-11/12 sm:w-9/12 2xl:w-[800px] mx-auto ",

  //drop down
  buttonDropDown: `px-4 py-2 ${text.sm} text-gray-700 hover:bg-gray-200 flex gap-3 items-center text-start w-full rounded`,
  buttonDropDownError: `px-4 py-2 ${text.sm} text-gray-700 hover:bg-red-400 hover:text-white flex gap-3 items-center text-start w-full rounded`,

  //sub navigation bar
  subNavigation: `flex ${text.lg} text-gray-800 px-4 pt-1 justify-center items-center hover:bg-gray-200 rounded-full gap-1`,
  subNavigationActive: "border-b-4 border-green-400 font-medium bg-gray-200",

  // tables
  arrowButtonPaginationActive:
    "ml-2 px-4 py-1 bg-gray-200 rounded-lg flex justify-center items-center gap-2 ",
  tableFooterStyling: "flex w-full  justify-center items-center py-5",

  // loading skeleton
  skeleton: "bg-neutral-300 animate-pulse rounded w-1/2 mb-2 flex h-[25px]",

  // register modal
  formRegisterModal:
    "justify-evenly items-center flex flex-col gap-3 px-10 pb-5",
  containerRegisterModal: "flex flex-col justify-center items-center",
  labelRegisterModal: `${text.xl} font-bold w-full text-gray-700 text-center`,
  subLabelRegisterModal: `${text.md} w-full text-gray-600 text-center mt-2`,

  // employees
  employeesSelectionContainer: `flex justify-center items-center hover:bg-gray-300 pl-2  rounded cursor-pointer ${text.md}`,
  employeesSelectionItem:
    "bg-transparent outline-none p-2  cursor-pointer w-[100px] sm:w-[150px] overflow-ellipsis overflow-hidden text-nowrap appearance-none",

  // login
  loginContainer:
    "bg-gray-100 sm:w-[400px] w-[350px] h-auto  shadow-xl p-7 rounded-md ",

  //layout
  layoutChildrenComponent:
    "overflow-y-auto  bg-gray-100  justify-center h-screen",
  layoutContainer: "flex h-auto sm:h-screen",
  layoutContainerHeader: "w-screen flex flex-col",
  layoutHeader:
    "bg-green-500 border-l-white justify-between border-l-2 h-[65px] flex sm:px-5 pl-3",
  layoutSubHeader: `flex items-center ${text.xl} font-medium text-white  gap-5`,
  layoutHeaderDropdown: `flex items-center ${text.lg} font-medium text-white sm:mr-10 mr-5 gap-3`,

  // settings styling
  settingsSecondFormContainer: "flex w-full overflow-x-auto overflow-y-auto",
  settingsSubTabContainer: "flex flex-col gap-10  justify-evenly h-full",
  settingsFormContainer:
    "flex w-full sm:w-10/12 h-[300px] bg-gray-100 p-5 rounded-lg border flex-col mx-auto",
  settingsFormContainerModal:
    "flex w-10/12 sm:w-1/3 h-[320px] bg-gray-100 p-5 rounded-lg border flex-col",

  // applications
  redDotPendingApplication:
    "absolute flex -top-1 -right-3 w-7 h-6 justify-center items-center text-white bg-red-400 rounded-full shadow text-[12px]",
  removeData: "bg-red-200 hover:bg-red-300",
};
