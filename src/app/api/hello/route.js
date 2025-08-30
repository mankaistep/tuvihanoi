import { GioiTinh } from '../../constant/constant'
import { 
    convertBirthToYin,
    anMenh, 
    anThan, 
    anCung, 
    anCuc, 
    anBanMenh,
    anAmDuongNamNu,
    anDaiVan,
    anSaoTuVi,
    anChinhTinh,
    anVongTruongSinh,
    anSaoVongLocTon,
    anSaoVongThaiTue,
    anSaoTheoThienCan,
    anSaoTheoDiaChi,
    anSaoTheoThangSinh,
    anSaoTheoGioSinh,
    anSaoHoaLinh,
    lapLaSo
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
      lapLaSoTuVi: lapLaSo(yinBirthday),
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
