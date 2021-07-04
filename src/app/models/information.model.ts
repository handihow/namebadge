import CompanyInfo from './companyInfo.model';
import PersonalInfo from './personalInfo.model';
import UCFile from './file.model';

export default interface InformationItem {
    companyInfo: CompanyInfo;
    personalInfo: PersonalInfo;
    files?: UCFile[];
    id: string;
}