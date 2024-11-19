"use client";

import { PDFDocument } from "pdf-lib";
import { alertError } from "./Alerts";
import { toUpper, toUpperV2 } from "./Inputs";
import { formatSalary } from "@/app/RSP/admin/appointment/modifyDocx";

export const readFileAsDataURL = (filePath) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;

    // Fetch the PDF file from the public folder
    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => reader.readAsDataURL(blob))
      .catch(reject);
  });
};

const handleData = (data) => {
  const result = data ? data : "N/A" || "N/A";
  return toUpperV2(result);
};

const handleDataForQuestion = (data) => {
  const result = data ? data : "" || "";
  return toUpperV2(result);
};

const handleDataForEmail = (data) => {
  const result = data ? data : "N/A" || "N/A";
  return result;
};

const formatDate = (inputDate) => {
  if (!inputDate) {
    return "N/A";
  }
  let currentDate = new Date(inputDate + "Z"); // Add "Z" to specify UTC time zone
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  let year = currentDate.getFullYear();
  return `${month}/${day}/${year}`;
};

const formatYear = (inputDate) => {
  if (!inputDate) {
    return "N/A";
  }
  let currentDate = new Date(inputDate + "Z"); // Add "Z" to specify UTC time zone
  let year = currentDate.getFullYear();
  return `${year}`;
};

export const handleFileRead = async ({
  dataUrl,
  personalInfo,
  childrenData,
  familyData,
  eligibilityData,
  educationData,
  referencesData,
  memberData,
  nonAcadsData,
  skillsData,
  voluntaryData,
  questionData,
  learningData,
  experienceData,
  setLoadingPrintPds,
}) => {
  try {
    // Parse the PDF document using pdf-lib
    const pdfDoc = await PDFDocument.load(dataUrl);

    const form = pdfDoc.getForm();
    const checkboxQuestion = ({ data, name }) => {
      {
        data
          ? form.getCheckBox(`${name}${data}`).defaultUpdateAppearances()
          : null;
      }
    };

    //PERSONAL INFORMATION
    form
      .getTextField("surname")
      .setText(`${handleData(personalInfo.lastname)}`);
    form
      .getTextField("firstname")
      .setText(`${handleData(personalInfo.firstname)}`);
    form
      .getTextField("middlename")
      .setText(`${handleData(personalInfo.middlename)}`);
    form
      .getTextField("name_extension")
      .setText(`${handleData(personalInfo.name_extension)}`);
    form
      .getTextField("birthdate")
      .setText(`${handleData(formatDate(personalInfo.birthdate))}`);
    form
      .getTextField("birth_place")
      .setText(`${handleData(personalInfo.birth_place)}`);
    form.getTextField("height").setText(`${handleData(personalInfo.height)}`);
    form.getTextField("weight").setText(`${handleData(personalInfo.weight)}`);
    form
      .getTextField("email")
      .setText(`${handleDataForEmail(personalInfo.email)}`);
    form
      .getTextField("mobile_no")
      .setText(`${handleData(personalInfo.mobile_no)}`);
    form
      .getTextField("telephone_no")
      .setText(`${handleData(personalInfo.telephone_no)}`);
    form
      .getTextField("employee_no")
      .setText(`${handleData(personalInfo.agency_employee_no)}`);
    form
      .getTextField("blood_type")
      .setText(`${handleData(personalInfo.blood_type)}`);
    form.getTextField("tin_no").setText(`${handleData(personalInfo.tin_no)}`);
    form.getTextField("gsis_no").setText(`${handleData(personalInfo.gsis_no)}`);
    form
      .getTextField("pag_ibig_no")
      .setText(`${handleData(personalInfo.pag_ibig_no)}`);
    form
      .getTextField("philhealth_no")
      .setText(`${handleData(personalInfo.philhealth_no)}`);
    form.getTextField("sss_no").setText(`${handleData(personalInfo.sss_no)}`);

    //checkbox
    {
      personalInfo.sex &&
        form
          .getCheckBox(`checkbox_sex_${personalInfo.sex}`)
          .defaultUpdateAppearances();
    }
    {
      personalInfo.citizenship &&
        form
          .getCheckBox(`checkbox_citizenship_${personalInfo.citizenship}`)
          .defaultUpdateAppearances();
    }
    {
      personalInfo.civil_status &&
        form
          .getCheckBox(`checkbox_civil_status_${personalInfo.civil_status}`)
          .defaultUpdateAppearances();
    }

    // residential address
    form
      .getTextField("residential_house_block_no")
      .setText(`${handleData(personalInfo.residential_house_block_no)}`);
    form
      .getTextField("residential_subdivision_village")
      .setText(`${handleData(personalInfo.residential_subdivision_village)}`);
    form
      .getTextField("residential_city_municipality")
      .setText(`${handleData(personalInfo.residential_city_municipality)}`);
    form
      .getTextField("residential_street")
      .setText(`${handleData(personalInfo.residential_street)}`);
    form
      .getTextField("residential_barangay")
      .setText(`${handleData(personalInfo.residential_barangay)}`);
    form
      .getTextField("residential_province")
      .setText(`${handleData(personalInfo.residential_province)}`);
    form
      .getTextField("residential_zip_code")
      .setText(`${handleData(personalInfo.residential_zip_code)}`);
    // permanent address
    form
      .getTextField("permanent_house_block_no")
      .setText(`${handleData(personalInfo.permanent_house_block_no)}`);
    form
      .getTextField("permanent_subdivision_village")
      .setText(`${handleData(personalInfo.permanent_subdivision_village)}`);
    form
      .getTextField("permanent_city_municipality")
      .setText(`${handleData(personalInfo.permanent_city_municipality)}`);
    form
      .getTextField("permanent_street")
      .setText(`${handleData(personalInfo.permanent_street)}`);
    form
      .getTextField("permanent_barangay")
      .setText(`${handleData(personalInfo.permanent_barangay)}`);
    form
      .getTextField("permanent_province")
      .setText(`${handleData(personalInfo.permanent_province)}`);
    form
      .getTextField("permanent_zip_code")
      .setText(`${handleData(personalInfo.permanent_zip_code)}`);
    //Family Background
    form
      .getTextField("spouse_surname")
      .setText(`${handleData(familyData.spouse_surname)}`);
    form
      .getTextField("spouse_firstname")
      .setText(`${handleData(familyData.spouse_firstname)}`);
    form
      .getTextField("spouse_middlename")
      .setText(`${handleData(familyData.spouse_middlename)}`);
    form
      .getTextField("spouse_name_extension")
      .setText(`${handleData(familyData.spouse_name_extension)}`);
    form
      .getTextField("spouse_occupation")
      .setText(`${handleData(familyData.spouse_occupation)}`);
    form
      .getTextField("spouse_business_name")
      .setText(`${handleData(familyData.spouse_business_name)}`);
    form
      .getTextField("spouse_business_address")
      .setText(`${handleData(familyData.spouse_business_address)}`);
    form
      .getTextField("spouse_telephone_no")
      .setText(`${handleData(familyData.spouse_telephone_no)}`);

    form
      .getTextField("father_surname")
      .setText(`${handleData(familyData.father_surname)}`);
    form
      .getTextField("father_firstname")
      .setText(`${handleData(familyData.father_firstname)}`);
    form
      .getTextField("father_middlename")
      .setText(`${handleData(familyData.father_middlename)}`);
    form
      .getTextField("father_name_extension")
      .setText(`${handleData(familyData.father_name_extension)}`);

    form
      .getTextField("mother_surname")
      .setText(`${handleData(familyData.mother_surname)}`);
    form
      .getTextField("mother_firstname")
      .setText(`${handleData(familyData.mother_firstname)}`);
    form
      .getTextField("mother_middlename")
      .setText(`${handleData(familyData.mother_middlename)}`);

    //Children Data
    if (childrenData.length === 0) {
      form.getTextField(`childname_0`).setText("N/A");
      form.getTextField(`child_birthdate_0`).setText("N/A");
    }

    childrenData.map(({ name, birthdate }, index) => {
      form
        .getTextField(`childname_${index}`)
        .setText(`${toUpper(name)}` || "N/A");
      form
        .getTextField(`child_birthdate_${index}`)
        .setText(`${formatDate(birthdate)}`);
    });
    // Education Data elementary
    form
      .getTextField("elem_name")
      .setText(`${handleData(educationData.elem_name)}`);
    form
      .getTextField("elem_degree_course")
      .setText(`${handleData(educationData.elem_degree_course)}`);

    form
      .getTextField(`elem_attendance_from`)
      .setText(`${formatYear(educationData.elem_attendance_from)}`);
    form
      .getTextField(`elem_attendance_to`)
      .setText(`${formatYear(educationData.elem_attendance_to)}`);
    form
      .getTextField("elem_highest_level_earned")
      .setText(`${handleData(educationData.elem_highest_level_earned)}`);
    form
      .getTextField(`elem_year_graduate`)
      .setText(`${formatYear(educationData.elem_year_graduate)}`);
    form
      .getTextField("elem_scholarship")
      .setText(`${handleData(educationData.elem_scholarship)}`);

    // Education Data secondary
    form
      .getTextField("sec_name")
      .setText(`${handleData(educationData.sec_name)}`);
    form
      .getTextField("sec_degree_course")
      .setText(`${handleData(educationData.sec_degree_course)}`);
    form
      .getTextField(`sec_attendance_from`)
      .setText(`${formatYear(educationData.sec_attendance_from)}`);
    form
      .getTextField(`sec_attendance_to`)
      .setText(`${formatYear(educationData.sec_attendance_to)}`);
    form
      .getTextField("sec_highest_level_earned")
      .setText(`${handleData(educationData.sec_highest_level_earned)}`);
    form
      .getTextField(`sec_year_graduate`)
      .setText(`${formatYear(educationData.sec_year_graduate)}`);
    form
      .getTextField("sec_scholarship")
      .setText(`${handleData(educationData.sec_scholarship)}`);

    // Education Data vocational
    form
      .getTextField("voc_name")
      .setText(`${handleData(educationData.voc_name)}`);
    form
      .getTextField("voc_degree_course")
      .setText(`${handleData(educationData.voc_degree_course)}`);
    form
      .getTextField(`voc_attendance_from`)
      .setText(`${formatYear(educationData.voc_attendance_from)}`);
    form
      .getTextField(`voc_attendance_to`)
      .setText(`${formatYear(educationData.voc_attendance_to)}`);
    form
      .getTextField("voc_highest_level_earned")
      .setText(`${handleData(educationData.voc_highest_level_earned)}`);
    form
      .getTextField(`voc_year_graduate`)
      .setText(`${formatYear(educationData.voc_year_graduate)}`);
    form
      .getTextField("voc_scholarship")
      .setText(`${handleData(educationData.voc_scholarship)}`);

    // Education Data college
    form
      .getTextField("col_name")
      .setText(`${handleData(educationData.col_name)}`);
    form
      .getTextField("col_degree_course")
      .setText(
        `${handleData(educationData?.col_degree_course_name?.toLowerCase())}`
      );
    form
      .getTextField(`col_attendance_from`)
      .setText(`${formatYear(educationData.col_attendance_from)}`);
    form
      .getTextField(`col_attendance_to`)
      .setText(`${formatYear(educationData.col_attendance_to)}`);
    form
      .getTextField("col_highest_level_earned")
      .setText(`${handleData(educationData.col_highest_level_earned)}`);
    form
      .getTextField(`col_year_graduate`)
      .setText(`${formatYear(educationData.col_year_graduate)}`);
    form
      .getTextField("col_scholarship")
      .setText(`${handleData(educationData.col_scholarship)}`);

    // Education Data graduate studies
    form
      .getTextField("grad_name")
      .setText(`${handleData(educationData.grad_name)}`);
    form
      .getTextField("grad_degree_course")
      .setText(`${handleData(educationData.grad_degree_course)}`);
    form
      .getTextField(`grad_attendance_from`)
      .setText(`${formatYear(educationData.grad_attendance_from)}`);
    form
      .getTextField(`grad_attendance_to`)
      .setText(`${formatYear(educationData.grad_attendance_to)}`);
    form
      .getTextField("grad_highest_level_earned")
      .setText(`${handleData(educationData.grad_highest_level_earned)}`);
    form
      .getTextField(`grad_year_graduate`)
      .setText(`${formatYear(educationData.grad_year_graduate)}`);
    form
      .getTextField("grad_scholarship")
      .setText(`${handleData(educationData.grad_scholarship)}`);

    //Eligibility Data
    if (eligibilityData.length === 0) {
      form.getTextField(`career_services_0`).setText("N/A");
      form.getTextField(`rating_0`).setText("N/A");
      form.getTextField(`date_exam_0`).setText("N/A");
      form.getTextField(`place_exam_0`).setText("N/A");
      form.getTextField(`license_number_0`).setText("N/A");
      form.getTextField(`date_validity_0`).setText("N/A");
    }

    eligibilityData.map(
      (
        {
          career_services_name,
          rating,
          date_exam,
          place_exam,
          license_number,
          date_validity,
        },
        index
      ) => {
        form
          .getTextField(`career_services_${index}`)
          .setText(`${toUpper(career_services_name)}` || "N/A");
        form.getTextField(`rating_${index}`).setText(`${rating}` || "N/A");
        form
          .getTextField(`date_exam_${index}`)
          .setText(`${formatDate(date_exam)}`);
        form
          .getTextField(`place_exam_${index}`)
          .setText(`${toUpper(place_exam)}` || "N/A");
        form
          .getTextField(`license_number_${index}`)
          .setText(`${license_number}` || "N/A");
        form
          .getTextField(`date_validity_${index}`)
          .setText(`${formatDate(date_validity)}`);
      }
    );
    //References
    form
      .getTextField("ref_one_fullname")
      .setText(`${handleData(referencesData.ref_one_fullname)}`);
    form
      .getTextField("ref_two_fullname")
      .setText(`${handleData(referencesData.ref_two_fullname)}`);
    form
      .getTextField("ref_three_fullname")
      .setText(`${handleData(referencesData.ref_three_fullname)}`);
    form
      .getTextField("ref_one_address")
      .setText(`${handleData(referencesData.ref_one_address)}`);
    form
      .getTextField("ref_two_address")
      .setText(`${handleData(referencesData.ref_two_address)}`);
    form
      .getTextField("ref_three_address")
      .setText(`${handleData(referencesData.ref_three_address)}`);
    form
      .getTextField("ref_one_number")
      .setText(`${handleData(referencesData.ref_one_number)}`);
    form
      .getTextField("ref_two_number")
      .setText(`${handleData(referencesData.ref_two_number)}`);
    form
      .getTextField("ref_three_number")
      .setText(`${handleData(referencesData.ref_three_number)}`);
    form
      .getTextField("gov_issued_id")
      .setText(`${handleData(referencesData.gov_issued_id)}`);
    form
      .getTextField("id_no")
      .setText(`${handleData(referencesData.id_license_no)}`);
    form
      .getTextField("date_place_issuance")
      .setText(`${handleData(referencesData.date_place_issued)}`);
    //Special Skills Hobbies Data
    if (skillsData.length === 0) {
      form.getTextField(`skills_name_0`).setText("N/A");
    }

    skillsData.map(({ name }, index) => {
      form
        .getTextField(`skills_name_${index}`)
        .setText(`${toUpper(name)}` || "N/A");
    });
    //membership org Data
    if (memberData.length === 0) {
      form.getTextField(`membership_name_0`).setText("N/A");
    }

    memberData.map(({ name }, index) => {
      form
        .getTextField(`membership_name_${index}`)
        .setText(`${toUpper(name)}` || "N/A");
    });
    //non academic Data
    if (nonAcadsData.length === 0) {
      form.getTextField(`non_acads_name_0`).setText("N/A");
    }

    nonAcadsData.map(({ name }, index) => {
      form
        .getTextField(`non_acads_name_${index}`)
        .setText(`${toUpper(name)}` || "N/A");
    });
    //Voluntary Work Data
    if (voluntaryData.length === 0) {
      form.getTextField(`name_address_0`).setText("N/A");
      form.getTextField(`voluntary_inclu_date_from_0`).setText("N/A");
      form.getTextField(`voluntary_inclu_date_to_0`).setText("N/A");
      form.getTextField(`num_hours_0`).setText("N/A");
      form.getTextField(`position_0`).setText("N/A");
    }

    voluntaryData.map(
      (
        {
          inclu_date_from,
          inclu_date_to,
          num_hours,
          org_address,
          org_name,
          position,
        },
        index
      ) => {
        form
          .getTextField(`name_address_${index}`)
          .setText(`${handleData(`${org_name} - ${org_address}`)}`);
        form
          .getTextField(`voluntary_inclu_date_from_${index}`)
          .setText(`${formatDate(inclu_date_from)}`);
        form
          .getTextField(`voluntary_inclu_date_to_${index}`)
          .setText(`${formatDate(inclu_date_to)}`);
        form
          .getTextField(`num_hours_${index}`)
          .setText(`${handleData(num_hours)}`);
        form
          .getTextField(`position_${index}`)
          .setText(`${handleData(position)}`);
      }
    );
    //Work Experience Data
    if (experienceData.length === 0) {
      form.getTextField(`work_inclu_date_from_0`).setText("N/A");
      form.getTextField(`work_inclu_date_to_0`).setText("N/A");
      form.getTextField(`work_position_title_0`).setText("N/A");
      form.getTextField(`work_org_name_0`).setText("N/A");
      form.getTextField(`work_monthly_salary_0`).setText("N/A");
      form.getTextField(`work_salary_grade_0`).setText("N/A");
      form.getTextField(`work_status_appointment_0`).setText("N/A");
      form.getTextField(`work_gov_service_0`).setText("N/A");
    }

    experienceData.map(
      (
        {
          gov_service,
          inclu_date_from,
          inclu_date_to,
          monthly_salary,
          org_name,
          position_title,
          salary_grade,
          status_appointment,
        },
        index
      ) => {
        form
          .getTextField(`work_inclu_date_from_${index}`)
          .setText(`${formatDate(inclu_date_from)}`);
        form
          .getTextField(`work_inclu_date_to_${index}`)
          .setText(`${formatDate(inclu_date_to)}`);
        form
          .getTextField(`work_position_title_${index}`)
          .setText(`${handleData(position_title)}`);
        form
          .getTextField(`work_org_name_${index}`)
          .setText(`${handleData(org_name)}`);
        form
          .getTextField(`work_monthly_salary_${index}`)
          .setText(`${handleData(formatSalary(monthly_salary))}`);
        form
          .getTextField(`work_salary_grade_${index}`)
          .setText(`${handleData(salary_grade)}`);
        form
          .getTextField(`work_status_appointment_${index}`)
          .setText(`${handleData(status_appointment)}`);
        form
          .getTextField(`work_gov_service_${index}`)
          .setText(`${gov_service.charAt(0).toUpperCase()}`);
      }
    );

    //Learning and Development Data
    if (learningData.length === 0) {
      form.getTextField(`title_learning_0`).setText("N/A");
      form.getTextField(`dev_inclu_date_from_0`).setText("N/A");
      form.getTextField(`dev_inclu_date_to_0`).setText("N/A");
      form.getTextField(`dev_num_hours_0`).setText("N/A");
      form.getTextField(`types_0`).setText("N/A");
      form.getTextField(`sponsored_by_0`).setText("N/A");
    }

    learningData.map(
      (
        {
          inclu_date_from,
          inclu_date_to,
          num_hours,
          sponsored_by,
          title_learning,
          types,
        },
        index
      ) => {
        form
          .getTextField(`title_learning_${index}`)
          .setText(`${handleData(title_learning)}`);
        form
          .getTextField(`dev_inclu_date_from_${index}`)
          .setText(`${formatDate(inclu_date_from)}`);
        form
          .getTextField(`dev_inclu_date_to_${index}`)
          .setText(`${formatDate(inclu_date_to)}`);
        form
          .getTextField(`dev_num_hours_${index}`)
          .setText(`${handleData(num_hours)}`);
        form.getTextField(`types_${index}`).setText(`${handleData(types)}`);
        form
          .getTextField(`sponsored_by_${index}`)
          .setText(`${handleData(sponsored_by)}`);
      }
    );

    // Questions
    checkboxQuestion({
      name: "questionOneA_",
      data: questionData.questionOneA,
    });
    checkboxQuestion({
      name: "questionOneB_",
      data: questionData.questionOneB,
    });

    form
      .getTextField("questionOneBYes")
      .setText(`${handleDataForQuestion(questionData.questionOneBYes)}`);
    checkboxQuestion({
      name: "questionTwoA_",
      data: questionData.questionTwoA,
    });

    form
      .getTextField("questionTwoAYes")
      .setText(`${handleDataForQuestion(questionData.questionTwoAYes)}`);
    checkboxQuestion({
      name: "questionTwoB_",
      data: questionData.questionTwoB,
    });

    form
      .getTextField("questionTwoBDate")
      .setText(`${handleDataForQuestion(questionData.questionTwoBDate)}`);
    form
      .getTextField("questionTwoBYes")
      .setText(`${handleDataForQuestion(questionData.questionTwoBYes)}`);
    checkboxQuestion({
      name: "questionThree_",
      data: questionData.questionThree,
    });

    form
      .getTextField("questionThreeYes")
      .setText(`${handleDataForQuestion(questionData.questionThreeYes)}`);
    checkboxQuestion({
      name: "questionFour_",
      data: questionData.questionFour,
    });

    form
      .getTextField("questionFourYes")
      .setText(`${handleDataForQuestion(questionData.questionFourYes)}`);
    checkboxQuestion({
      name: "questionFiveA_",
      data: questionData.questionFiveA,
    });

    form
      .getTextField("questionFiveAYes")
      .setText(`${handleDataForQuestion(questionData.questionFiveAYes)}`);
    checkboxQuestion({
      name: "questionFiveB_",
      data: questionData.questionFiveB,
    });

    form
      .getTextField("questionFiveBYes")
      .setText(`${handleDataForQuestion(questionData.questionFiveBYes)}`);
    checkboxQuestion({
      name: "questionSix_",
      data: questionData.questionSix,
    });

    form
      .getTextField("questionSixYes")
      .setText(`${handleDataForQuestion(questionData.questionSixYes)}`);
    checkboxQuestion({
      name: "questionSevenA_",
      data: questionData.questionSevenA,
    });

    form
      .getTextField("questionSevenAYes")
      .setText(`${handleDataForQuestion(questionData.questionSevenAYes)}`);
    checkboxQuestion({
      name: "questionSevenB_",
      data: questionData.questionSevenB,
    });
    form
      .getTextField("questionSevenBYes")
      .setText(`${handleDataForQuestion(questionData.questionSevenBYes)}`);
    checkboxQuestion({
      name: "questionSevenC_",
      data: questionData.questionSevenC,
    });
    form
      .getTextField("questionSevenCYes")
      .setText(`${handleDataForQuestion(questionData.questionSevenCYes)}`);

    //to disable fillable fields
    form.updateFieldAppearances();
    form.flatten();

    // Open the PDF in a new tab (optional)
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const objectUrl = URL.createObjectURL(blob);
    setLoadingPrintPds(false);
    window.open(objectUrl, "_blank");
  } catch (error) {
    setTimeout(() => {
      setLoadingPrintPds(false);
      alertError("Something went wrong!. Please Try again later!");
    }, 5000);
    console.error("Error reading PDF file:", error);
  }
};
