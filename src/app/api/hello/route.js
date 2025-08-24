import solarlunar from 'solarlunar'
import { GioiTinh } from '../../constant/constant'
import { 
    anMenh, 
    anThan, 
    anCung, 
    anCuc, 
    anBanMenh,
    anAmDuongNamNu,
    anDaiVan,
    anSaoTuVi,
    anChinhTinh
} from '../../utils/utils'

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get('day');
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const hours = searchParams.get('hours') || '0';
  const minutes = searchParams.get('minutes') || '0';

  const genderRaw = searchParams.get('gender') || 'NAM';


  // Basic validation
  if (!day || !month || !year) {
    return Response.json(
      { error: 'Day, month, and year are required parameters' },
      { status: 400 }
    );
  } 

  try {
    // Create a Date object from the parameters
    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1, // JavaScript months are 0-indexed
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );

    // Validate the date
    if (isNaN(birthDate.getTime())) {
      throw new Error('Invalid date');
    }

    // Calculate age (simplified)
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Gioi tinh
    const gender = GioiTinh[genderRaw] || GioiTinh.NAM;

    const yinBirthday = convertBirthToYin({
      year: year,
      month: month,
      day: day,
      hours: hours,
      minutes: minutes,
      gender: gender
    })

    // Create response data
    const data = {
      viTriTuVi: anSaoTuVi(yinBirthday),
      chinhTinh: anChinhTinh(yinBirthday),
      birthDate: birthDate.toISOString(),
      age,
      status: 'success',
      yinBirthday: yinBirthday,
      amDuongNamNu: anAmDuongNamNu(yinBirthday),
      menh: anMenh(yinBirthday),
      than: anThan(yinBirthday),
      cuc: anCuc(yinBirthday),
      banMenh: anBanMenh(yinBirthday),
      daiVan: anDaiVan(yinBirthday),
      cung: anCung(yinBirthday),
    };

    return Response.json(data);
  } catch (error) {
    console.log(error)
    return Response.json(
      { error: 'Invalid date parameters', details: error.message },
      { status: 400 }
    );
  }
}

function convertBirthToYin(birthDate) {
  const solarYear = parseInt(birthDate.year);
  const solarMonth = parseInt(birthDate.month);
  const solarDay = parseInt(birthDate.day);

  const lunarDate = solarlunar.solar2lunar(solarYear, solarMonth, solarDay);

  let lunarMonth = lunarDate.lMonth;

  const gender = birthDate.gender;

  // Nếu tháng nhuận
  if (lunarDate.isLeap) {
    const middleDay = 15; // nửa tháng ~ ngày 15
    if (lunarDate.lDay > middleDay) {
      // nửa sau tháng nhuận => chuyển sang tháng sau
      lunarMonth = lunarMonth + 1;
    }
    // nửa đầu thì giữ nguyên lunarMonth
  }

  return {
    day: lunarDate.lDay,
    month: lunarMonth,
    year: lunarDate.lYear,
    hours: parseInt(birthDate.hours),
    minutes: parseInt(birthDate.minutes),
    isLeap: lunarDate.isLeap,
    gender: gender
  };
}
