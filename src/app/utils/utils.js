import {
    ConGiap, 
    Cung, 
    ThienCan, 
    Cuc, 
    BanMenh,
    AmDuongNamNu ,
    GioiTinh,
    ChinhTinh,
    VongTruongSinh,
    PhuTinh
} from "../constant/constant";

import solarlunar from 'solarlunar'


/*
    An co ban
*/
export function anCanChi(yinBirthDate) {
    const year = Number(yinBirthDate.year); // năm âm lịch
  
    // Map số -> Can
    const canKeys = ["CANH","TAN","NHAM","QUY","GIAP","AT","BINH","DINH","MAU","KY"];
    const canKey = canKeys[year % 10];
    const can = ThienCan[canKey];
  
    // Map số -> Chi
    const chiKeys = ["THAN","DAU","TUAT","HOI","TY","SUU","DAN","MAO","THIN","TY_SNAKE","NGO","MUI"];
    const chiKey = chiKeys[year % 12];
    const chi = ConGiap[chiKey];
  
    return { canKey, can, chiKey, chi };
}

export function anMenh(yinBirthDate) {
  const monthNum = Number(yinBirthDate.month); 
  const hourNum  = Number(yinBirthDate.hours); 

  // 1) From Dần (3) count forward to tháng sinh -> the branch index of the month
  const monthPosition = mod((ConGiap.DAN.number - 1) + (monthNum - 1), 12) + 1;

  // 2) Determine the birth hour branch (Tý 23–1, Sửu 1–3, ..., Tuất 19–21, Hợi 21–23)
  const hourBranch = getConGiapByHour(hourNum); // returns one of ConGiap entries

  // 3) Count backward from monthPosition (treated as Tý=1) to hourBranch
  const numOfMenh = mod(monthPosition - hourBranch.number, 12) + 1;

  return getConGiapByNumber(numOfMenh);
}

export function anThan(yinBirthDate) {
    const monthNum = Number(yinBirthDate.month); // lunar month 1..12
    const hourNum  = Number(yinBirthDate.hours); // 0..23
  
    // 1) From Dần count to lunar month -> monthPosition
    const monthPosition = mod((ConGiap.DAN.number - 1) + (monthNum - 1), 12) + 1;
  
    // 2) Determine the birth hour branch
    const hourBranch = getConGiapByHour(hourNum);
  
    // 3) Count forward (thuận) from monthPosition (treated as Tý=1) by (hourBranch.number - 1)
    const numOfThan = mod(monthPosition + (hourBranch.number - 1) - 1, 12) + 1;
  
    return getConGiapByNumber(numOfThan);
}

export function anCung(yinBirthDate) {
    const hourBranch = getConGiapByHour(yinBirthDate.hours);
  
    // Starting position: Mệnh = hour branch
    const menhNum = hourBranch.number;
  
    const cungNames = Object.keys(Cung);
    const result = {};
  
    cungNames.forEach((cungName, idx) => {
      const giapNum = mod(menhNum - 1 + idx, 12) + 1;
      result[cungName] = getConGiapByNumber(giapNum);
    });
  
    return result;
}

export function anCuc(yinBirthDate) {
    const { canKey, chi, chiKey } = anCanChi(yinBirthDate); // lấy can/chi năm sinh
    const menhBranch = anMenh(yinBirthDate);
  
    // Nhóm Can
    const canGroups = {
      GIAP: "GIAPKY",
      KY: "GIAPKY",
      AT: "ATCANH",
      CANH: "ATCANH",
      BINH: "BINHTAN",
      TAN: "BINHTAN",
      DINH: "DINHNHAM",
      NHAM: "DINHNHAM",
      MAU: "MAUQUY",
      QUY: "MAUQUY"
    };
  
    // Bảng tra Cục
    const cucTable = {
      GIAPKY: {
        TY: Cuc.THUY_NHI, SUU: Cuc.THUY_NHI,
        DAN: Cuc.HOA_LUC, MAO: Cuc.HOA_LUC,
        THIN: Cuc.MOC_TAM, TY_SNAKE: Cuc.MOC_TAM,
        NGO: Cuc.THO_NGU, MUI: Cuc.THO_NGU,
        THAN: Cuc.KIM_TU, DAU: Cuc.KIM_TU,
        TUAT: Cuc.THUY_NHI, HOI: Cuc.THUY_NHI
      },
      ATCANH: {
        TY: Cuc.HOA_LUC, SUU: Cuc.HOA_LUC,
        DAN: Cuc.THO_NGU, MAO: Cuc.THO_NGU,
        THIN: Cuc.KIM_TU, TY_SNAKE: Cuc.KIM_TU,
        NGO: Cuc.MOC_TAM, MUI: Cuc.MOC_TAM,
        THAN: Cuc.THUY_NHI, DAU: Cuc.THUY_NHI,
        TUAT: Cuc.HOA_LUC, HOI: Cuc.HOA_LUC
      },
      BINHTAN: {
        TY: Cuc.THO_NGU, SUU: Cuc.THO_NGU,
        DAN: Cuc.MOC_TAM, MAO: Cuc.MOC_TAM,
        THIN: Cuc.THUY_NHI, TY_SNAKE: Cuc.THUY_NHI,
        NGO: Cuc.KIM_TU, MUI: Cuc.KIM_TU,
        THAN: Cuc.HOA_LUC, DAU: Cuc.HOA_LUC,
        TUAT: Cuc.THO_NGU, HOI: Cuc.THO_NGU
      },
      DINHNHAM: {
        TY: Cuc.MOC_TAM, SUU: Cuc.MOC_TAM,
        DAN: Cuc.KIM_TU, MAO: Cuc.KIM_TU,
        THIN: Cuc.HOA_LUC, TY_SNAKE: Cuc.HOA_LUC,
        NGO: Cuc.THUY_NHI, MUI: Cuc.THUY_NHI,
        THAN: Cuc.THO_NGU, DAU: Cuc.THO_NGU,
        TUAT: Cuc.MOC_TAM, HOI: Cuc.MOC_TAM
      },
      MAUQUY: {
        TY: Cuc.KIM_TU, SUU: Cuc.KIM_TU,
        DAN: Cuc.THUY_NHI, MAO: Cuc.THUY_NHI,
        THIN: Cuc.THO_NGU, TY_SNAKE: Cuc.THO_NGU,
        NGO: Cuc.HOA_LUC, MUI: Cuc.HOA_LUC,
        THAN: Cuc.MOC_TAM, DAU: Cuc.MOC_TAM,
        TUAT: Cuc.KIM_TU, HOI: Cuc.KIM_TU
      }
    };
  
    // Fix: dùng canKey thay vì can
    const canGroup = canGroups[canKey];
  
    if (!canGroup) return null;
  
    const branchKey = menhBranch.key; // ví dụ "TY", "DAN", "NGO"
    const cuc = cucTable[canGroup][branchKey];
  
    return cuc ? { cuc, chi: menhBranch } : null;
}  

export function anBanMenh(yinBirthDate) {
    const { canKey, chiKey } = anCanChi(yinBirthDate); // lấy can/chi năm sinh

    const map = {
      GIAP_TY: BanMenh.HAI_TRUNG_KIM, AT_SUU: BanMenh.HAI_TRUNG_KIM,
      BINH_DAN: BanMenh.LO_TRUNG_HOA, DINH_MAO: BanMenh.LO_TRUNG_HOA,
      MAU_THIN: BanMenh.DAI_LAM_MOC, KY_TY_SNAKE: BanMenh.DAI_LAM_MOC,
      CANH_NGO: BanMenh.LO_BANG_THO, TAN_MUI: BanMenh.LO_BANG_THO,
      NHAM_THAN: BanMenh.KIEM_PHONG_KIM, QUY_DAU: BanMenh.KIEM_PHONG_KIM,
      GIAP_TUAT: BanMenh.SON_DAU_HOA, AT_HOI: BanMenh.SON_DAU_HOA,
      BINH_TY: BanMenh.GIAN_HA_THUY, DINH_SUU: BanMenh.GIAN_HA_THUY,
      MAU_DAN: BanMenh.THANH_DAU_THO, KY_MAO: BanMenh.THANH_DAU_THO,
      CANH_THIN: BanMenh.BACH_LAP_KIM, TAN_TY_SNAKE: BanMenh.BACH_LAP_KIM,
      NHAM_NGO: BanMenh.DUONG_LIEU_MOC, QUY_MUI: BanMenh.DUONG_LIEU_MOC,
      GIAP_THAN: BanMenh.TUYEN_TRUNG_THUY, AT_DAU: BanMenh.TUYEN_TRUNG_THUY,
      BINH_TUAT: BanMenh.OC_THUONG_THO, DINH_HOI: BanMenh.OC_THUONG_THO,
      MAU_TY: BanMenh.TICH_LICH_HOA, KY_SUU: BanMenh.TICH_LICH_HOA,
      CANH_DAN: BanMenh.TONG_BACH_MOC, TAN_MAO: BanMenh.TONG_BACH_MOC,
      NHAM_THIN: BanMenh.TRANG_LUU_THUY, QUY_TY_SNAKE: BanMenh.TRANG_LUU_THUY,
      GIAP_NGO: BanMenh.SA_TRUNG_KIM, AT_MUI: BanMenh.SA_TRUNG_KIM,
      BINH_THAN: BanMenh.SON_HA_HOA, DINH_DAU: BanMenh.SON_HA_HOA,
      MAU_TUAT: BanMenh.BINH_DIA_MOC, KY_HOI: BanMenh.BINH_DIA_MOC,
      CANH_TY: BanMenh.BICH_THUONG_THO, TAN_SUU: BanMenh.BICH_THUONG_THO,
      NHAM_DAN: BanMenh.KIM_BACH_KIM, QUY_MAO: BanMenh.KIM_BACH_KIM,
      GIAP_THIN: BanMenh.PHU_DANG_HOA, AT_TY_SNAKE: BanMenh.PHU_DANG_HOA,
      BINH_NGO: BanMenh.THIEN_HA_THUY, DINH_MUI: BanMenh.THIEN_HA_THUY,
      MAU_THAN: BanMenh.DAI_TRACH_THO, KY_DAU: BanMenh.DAI_TRACH_THO,
      CANH_TUAT: BanMenh.XUYEN_THOA_KIM, TAN_HOI: BanMenh.XUYEN_THOA_KIM,
      NHAM_TY: BanMenh.TANG_DO_MOC, QUY_SUU: BanMenh.TANG_DO_MOC,
      GIAP_DAN: BanMenh.DAI_KHE_THUY, AT_MAO: BanMenh.DAI_KHE_THUY,
      BINH_THIN: BanMenh.SA_TRUNG_THO, DINH_TY_SNAKE: BanMenh.SA_TRUNG_THO,
      MAU_NGO: BanMenh.THIEN_THUONG_HOA, KY_MUI: BanMenh.THIEN_THUONG_HOA,
      CANH_THAN: BanMenh.THACH_LUU_MOC, TAN_DAU: BanMenh.THACH_LUU_MOC,
      NHAM_TUAT: BanMenh.DAI_HAI_THUY, QUY_HOI: BanMenh.DAI_HAI_THUY,
    };

    return map[`${canKey}_${chiKey}`] || null;
}

export function anAmDuongNamNu(yinBirthDate) {
    const { canKey } = anCanChi(yinBirthDate);   // lấy can từ năm sinh
    const gender = yinBirthDate.gender;          // "NAM" | "NU"
  
    const duongCan = ["GIAP", "BINH", "MAU", "CANH", "NHAM"];
  
    const isDuongCan = duongCan.includes(canKey);
  
    if (gender == GioiTinh.NAM) {
      return isDuongCan ? AmDuongNamNu.DUONG_NAM : AmDuongNamNu.AM_NAM;
    } else if (gender == GioiTinh.NU) {
      return isDuongCan ? AmDuongNamNu.DUONG_NU : AmDuongNamNu.AM_NU;
    }
  
    return null;
}

export function anDaiVan(yinBirthDate) {
    const { cuc, chi: menhBranch } = anCuc(yinBirthDate);
    const amDuongNamNu = anAmDuongNamNu(yinBirthDate);

    if (!cuc || !menhBranch) return [];
  
    const isThuan =
      amDuongNamNu === AmDuongNamNu.DUONG_NAM ||
      amDuongNamNu === AmDuongNamNu.AM_NU;
  
    const daiVanList = [];
    let startIdx = menhBranch.number - 1; // vị trí chi của cung Mệnh
  
    for (let i = 0; i < 12; i++) {
      const offset = isThuan ? i : -i;
      const chiNum = mod(startIdx + offset, 12) + 1;
      const chi = getConGiapByNumber(chiNum);
  
      daiVanList.push({
        startAge: cuc.number + i * 10, // tuổi âm bắt đầu đại vận
        chi,                           // chi của cung đại vận
        index: i + 1                   // số thứ tự cung
      });
    }
  
    return daiVanList;
}

export function anSaoTuVi(yinBirthDate) {
    const { cuc } = anCuc(yinBirthDate);
    if (!cuc) return null;
  
    const day = yinBirthDate.day;
    const cucNum = cuc.number;
  
    // 1. Tính bước đếm
    let count = Math.floor(day / cucNum);
    let borrowed = 0;
  
    if (day % cucNum !== 0) {
      borrowed = cucNum - (day % cucNum);
      count = Math.floor((day + borrowed) / cucNum);
    }
  
    // 2. Bắt đầu từ Dần
    const startIdx = ConGiap.DAN.number - 1;
  
    // 3. Xác định hướng
    const direction = borrowed % 2 === 0 ? 1 : -1;
  
    // 4. Tính số bước cuối cùng
    let steps = direction === 1 ? count + borrowed : count - borrowed;
    const finalIdx = mod(startIdx + steps - 1, 12); // trừ 1 vì đếm từ Dần là 1
  
    // 5. Lấy ConGiap
    for (const key in ConGiap) {
      if (ConGiap[key].number === finalIdx + 1) return ConGiap[key];
    }
  
    return null;
}

export function anChinhTinh(yinBirthDate) {
    const result = {};
  
    const tuVi = anSaoTuVi(yinBirthDate);
    if (!tuVi) return null;
    result[ChinhTinh.TU_VI.name] = tuVi;
  
    // An Thiên Phủ theo bảng ánh xạ
    const thienPhuKey = getThienPhuKey(tuVi.key);
    result[ChinhTinh.THIEN_PHU.name] = ConGiap[thienPhuKey];
  
    const CUNG_KIM_DONG_HO = [
      "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE",
      "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"
    ];
  
    // Hàm lấy cung tiếp theo theo chiều kim đồng hồ hoặc ngược
    function nextCung(startKey, step = 1, clockwise = true, skipKeys = []) {
      let idx = CUNG_KIM_DONG_HO.indexOf(startKey);
      while (step > 0) {
        idx = mod(idx + (clockwise ? 1 : -1), 12);
        if (!skipKeys.includes(CUNG_KIM_DONG_HO[idx])) step--;
      }
      return CUNG_KIM_DONG_HO[idx];
    }
  
    // 1️⃣ An các sao từ Tử Vi (ngược kim đồng hồ)
    let currentKey = tuVi.key;
    const saoTuViOrder = [
      { star: ChinhTinh.THIEN_CO, skip: 0 },
      { star: ChinhTinh.THAI_DUONG, skip: 1 },
      { star: ChinhTinh.VU_KHUC, skip: 0 },
      { star: ChinhTinh.THIEN_DONG, skip: 0 },
      { star: ChinhTinh.LIEM_TRINH, skip: 2 },
    ];
  
    saoTuViOrder.forEach(({ star, skip }) => {
      // Bỏ cung trước khi an sao
      const skipKeys = [];
      for (let i = 0; i < skip; i++) {
        skipKeys.push(nextCung(currentKey, 1, false));
      }
      const cungKey = nextCung(currentKey, 1, false, skipKeys);
      result[star.name] = ConGiap[cungKey];
      currentKey = cungKey;
    });
  
    // 2️⃣ An các sao từ Thiên Phủ (thuận)
    currentKey = thienPhuKey;
    const saoThienPhuOrder = [
      { star: ChinhTinh.THAI_AM, skip: 0 },
      { star: ChinhTinh.THAM_LANG, skip: 0 },
      { star: ChinhTinh.CU_MON, skip: 0 },
      { star: ChinhTinh.THIEN_TUONG, skip: 0 },
      { star: ChinhTinh.THIEN_LUONG, skip: 0 },
      { star: ChinhTinh.THAT_SAT, skip: 0 },
      { star: ChinhTinh.PHA_QUAN, skip: 3 },
    ];
  
    saoThienPhuOrder.forEach(({ star, skip }) => {
      const skipKeys = [];
      for (let i = 0; i < skip; i++) {
        skipKeys.push(nextCung(currentKey, 1, true));
      }
      const cungKey = nextCung(currentKey, 1, true, skipKeys);
      result[star.name] = ConGiap[cungKey];
      currentKey = cungKey;
    });
  
    return result;
}

export function anVongTruongSinh(yinBirthDate) {
    const result = {};
  
    const cucObj = anCuc(yinBirthDate);
    if (!cucObj) return null;
    const cucNumber = cucObj.cuc.number;
  
    const amDuongNamNu = anAmDuongNamNu(yinBirthDate);
    const clockwise =
      amDuongNamNu === "DUONG_NAM" || amDuongNamNu === "AM_NU";
  
    const TruongSinhStart = {
      2: "THAN",    // Thủy Nhị Cục
      5: "THAN",    // Thổ Ngũ Cục
      6: "DAN",     // Hỏa Lục Cục
      3: "HOI",     // Mộc Tam Cục
      4: "TY_SNAKE" // Kim Tứ Cục
    };
    const startCungKey = TruongSinhStart[cucNumber];
    if (!startCungKey) return null;
  
    const CUNG_KIM_DONG_HO = [
      "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE",
      "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"
    ];
  
    let idx = CUNG_KIM_DONG_HO.indexOf(startCungKey);
    const saoVongTSKeys = Object.keys(VongTruongSinh); // Dùng constant
    saoVongTSKeys.forEach(starKey => {
      result[VongTruongSinh[starKey].name] = ConGiap[CUNG_KIM_DONG_HO[idx]];
      idx = mod(idx + (clockwise ? 1 : -1), 12);
    });
  
    return result;
}

export function anSaoVongLocTon(yinBirthDate) {
    const result = {};
  
    // Lấy can năm sinh
    const { canKey } = anCanChi(yinBirthDate);
  
    // Xác định cung Lộc Tồn theo Thiên Can
    const locTonStart = {
      GIAP: "DAN",
      AT: "MAO",
      BINH: "TY_SNAKE",
      DINH: "NGO",
      MAU: "TY_SNAKE",
      KY: "NGO",
      CANH: "THAN",
      TAN: "DAU",
      NHAM: "HOI",
      QUY: "TY"
    };
    const startCungKey = locTonStart[canKey];
    if (!startCungKey) return null;
  
    // Xác định chiều thuận hay nghịch
    const amDuongNamNu = anAmDuongNamNu(yinBirthDate);
    const clockwise =
      amDuongNamNu === "DUONG_NAM" || amDuongNamNu === "AM_NU";
  
    // Thứ tự cung theo kim đồng hồ
    const CUNG_KIM_DONG_HO = [
      "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE",
      "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"
    ];
  
    // Thứ tự sao vòng Lộc Tồn (sau Lộc Tồn và Bác Sĩ)
    const saoVongLTKeys = [
      "LUC_SI", "THANH_LONG", "TIEU_HAO", "TUONG_QUAN",
      "TAU_THU", "PHI_LIEM", "HI_THANH", "BENH_PHU",
      "DAI_HAO", "PHUC_BINH", "QUAN_PHU"
    ];
  
    // An Lộc Tồn
    let idx = CUNG_KIM_DONG_HO.indexOf(startCungKey);
    result[PhuTinh.LOC_TON.name] = ConGiap[CUNG_KIM_DONG_HO[idx]];
  
    // An Bác Sĩ cùng cung với Lộc Tồn
    result[PhuTinh.BAC_SI.name] = ConGiap[CUNG_KIM_DONG_HO[idx]];
  
    // An các sao còn lại
    saoVongLTKeys.forEach(starKey => {
      idx = mod(idx + (clockwise ? 1 : -1), 12);
      result[PhuTinh[starKey].name] = ConGiap[CUNG_KIM_DONG_HO[idx]];
    });
  
    return result;
}

export function anSaoVongThaiTue(yinBirthDate) {
    const result = {};
  
    // Xác định cung Thái Tuế theo địa chi năm sinh
    const { chiKey } = anCanChi(yinBirthDate); // lấy chi năm sinh
    if (!chiKey) return null;
  
    // Thứ tự cung theo kim đồng hồ
    const CUNG_KIM_DONG_HO = [
      "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE",
      "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"
    ];
  
    // Thứ tự các sao vòng Thái Tuế (theo thứ tự an)
    const saoVongThaiTueKeys = [
      "THIEU_DUONG",
      "TANG_MON",
      "THIEU_AM",
      "QUAN_PHU_TT",
      "TU_PHU",
      "TUE_PHA",
      "LONG_DUC",
      "BACH_HO",
      "PHUC_DUC_TT",
      "DIEU_KHACH",
      "TRUC_PHU"
    ];
  
    // An Thái Tuế
    let idx = CUNG_KIM_DONG_HO.indexOf(chiKey);
    result[PhuTinh.THAI_TUE.name] = ConGiap[CUNG_KIM_DONG_HO[idx]];
  
    // An các sao còn lại theo chiều thuận kim đồng hồ
    saoVongThaiTueKeys.forEach(starKey => {
      idx = mod(idx + 1, 12);
      result[PhuTinh[starKey].name] = ConGiap[CUNG_KIM_DONG_HO[idx]];
    });
  
    return result;
}

export function anSaoTheoThienCan(yinBirthDate) {
    const result = {};
    const { canKey } = anCanChi(yinBirthDate); // lấy Thiên can năm sinh
    if (!canKey) return null;
  
    // 1️⃣ Tứ Hóa theo Thiên Can
    const tuHoaTable = {
      GIAP: { HOA_LOC: ChinhTinh.LIEM_TRINH, HOA_QUYEN: ChinhTinh.PHA_QUAN, HOA_KHOA: ChinhTinh.VU_KHUC, HOA_KY: ChinhTinh.THAI_DUONG },
      AT:   { HOA_LOC: ChinhTinh.THIEN_CO, HOA_QUYEN: ChinhTinh.THIEN_LUONG, HOA_KHOA: ChinhTinh.TU_VI, HOA_KY: ChinhTinh.THAI_AM },
      BING: { HOA_LOC: ChinhTinh.THIEN_DONG, HOA_QUYEN: ChinhTinh.THIEN_CO, HOA_KHOA: PhuTinh.VAN_XUONG, HOA_KY: ChinhTinh.LIEM_TRINH },
      DINH: { HOA_LOC: ChinhTinh.THAI_AM, HOA_QUYEN: ChinhTinh.THIEN_DONG, HOA_KHOA: ChinhTinh.THIEN_CO, HOA_KY: ChinhTinh.CU_MON },
      MAU:  { HOA_LOC: ChinhTinh.THAM_LANG, HOA_QUYEN: ChinhTinh.THAI_AM, HOA_KHOA: ChinhTinh.THAI_DUONG, HOA_KY: ChinhTinh.THIEN_CO },
      KY:   { HOA_LOC: ChinhTinh.VU_KHUC, HOA_QUYEN: ChinhTinh.THAM_LANG, HOA_KHOA: ChinhTinh.THIEN_LUONG, HOA_KY: ChinhTinh.VAN_KHUC },
      CANH: { HOA_LOC: ChinhTinh.THAI_DUONG, HOA_QUYEN: ChinhTinh.VU_KHUC, HOA_KHOA: ChinhTinh.THIEN_DONG, HOA_KY: ChinhTinh.THIEN_TUONG },
      TAN:  { HOA_LOC: ChinhTinh.CU_MON, HOA_QUYEN: ChinhTinh.THAI_DUONG, HOA_KHOA: PhuTinh.VAN_KHUC, HOA_KY: PhuTinh.VAN_XUONG },
      NHAM: { HOA_LOC: ChinhTinh.THIEN_LUONG, HOA_QUYEN: ChinhTinh.TU_VI, HOA_KHOA: PhuTinh.TA_PHU, HOA_KY: ChinhTinh.VU_KHUC },
      QUY:  { HOA_LOC: ChinhTinh.PHA_QUAN, HOA_QUYEN: ChinhTinh.CU_MON, HOA_KHOA: ChinhTinh.THAI_AM, HOA_KY: ChinhTinh.THAM_LANG }
    };
  
    const tuHoa = tuHoaTable[canKey];
    if (tuHoa) {
      Object.entries(tuHoa).forEach(([key, star]) => {
        result[PhuTinh[key].name] = star;
      });
    }
  
    // 2️⃣ Sao theo Thiên Can (theo bảng chuẩn)
    const saoCanTable = {
        GIAP: {
            DA_LA: "SUU",
            KINH_DUONG: "MAO",
            LUU_HA: "DAU",
            QUOC_AN: "TUAT",
            DUONG_PHU: "MUI",
            VAN_TINH: "TY_SNAKE",
            THIEN_KHOI: "SUU",
            THIEN_VIET: "MUI",
            THIEN_QUAN: "MUI",
            THIEN_PHUC: "DAU",
            THIEN_TRU: "TY_SNAKE",
            TRIET_KHONG: ["THAN", "DAU"]
        },
        AT: {
            DA_LA: "DAN",
            KINH_DUONG: "THIN",
            LUU_HA: "TUAT",
            QUOC_AN: "HOI",
            DUONG_PHU: "THAN",
            VAN_TINH: "NGO",
            THIEN_KHOI: "TY",
            THIEN_VIET: "THAN",
            THIEN_QUAN: "THIN",
            THIEN_PHUC: "THAN",
            THIEN_TRU: "NGO",
            TRIET_KHONG: ["NGO", "MUI"]
        },
        BINH: {
            DA_LA: "THIN",
            KINH_DUONG: "NGO",
            LUU_HA: "MUI",
            QUOC_AN: "SUU",
            DUONG_PHU: "TUAT",
            VAN_TINH: "THAN",
            THIEN_KHOI: "HOI",
            THIEN_VIET: "DAU",
            THIEN_QUAN: "TY_SNAKE",
            THIEN_PHUC: "TY",
            THIEN_TRU: "TY",
            TRIET_KHONG: ["THIN", "TY_SNAKE"]
        },
        DINH: {
            DA_LA: "TY_SNAKE",
            KINH_DUONG: "MUI",
            LUU_HA: "THIN",
            QUOC_AN: "DAN",
            DUONG_PHU: "HOI",
            VAN_TINH: "DAU",
            THIEN_KHOI: "HOI",
            THIEN_VIET: "DAU",
            THIEN_QUAN: "DAN",
            THIEN_PHUC: "HOI",
            THIEN_TRU: "TY_SNAKE",
            TRIET_KHONG: ["DAN", "MAO"]
        },
        MAU: {
            DA_LA: "THIN",
            KINH_DUONG: "NGO",
            LUU_HA: "TY_SNAKE",
            QUOC_AN: "SUU",
            DUONG_PHU: "TUAT",
            VAN_TINH: "THAN",
            THIEN_KHOI: "SUU",
            THIEN_VIET: "MUI",
            THIEN_QUAN: "MAO",
            THIEN_PHUC: "MAO",
            THIEN_TRU: "NGO",
            TRIET_KHONG: ["TY", "SUU"]
        },
        KY: {
            DA_LA: "TY_SNAKE",
            KINH_DUONG: "MUI",
            LUU_HA: "NGO",
            QUOC_AN: "DAN",
            DUONG_PHU: "HOI",
            VAN_TINH: "DAU",
            THIEN_KHOI: "TY",
            THIEN_VIET: "THAN",
            THIEN_QUAN: "DAU",
            THIEN_PHUC: "DAN",
            THIEN_TRU: "THAN",
            TRIET_KHONG: ["THAN", "DAU"]
        },
        CANH: {
            DA_LA: "MUI",
            KINH_DUONG: "DAU",
            LUU_HA: "THAN",
            QUOC_AN: "THIN",
            DUONG_PHU: "SUU",
            VAN_TINH: "HOI",
            THIEN_KHOI: "NGO",
            THIEN_VIET: "DAN",
            THIEN_QUAN: "HOI",
            THIEN_PHUC: "NGO",
            THIEN_TRU: "DAN",
            TRIET_KHONG: ["NGO", "MUI"]
        },
        TAN: {
            DA_LA: "THAN",
            KINH_DUONG: "TUAT",
            LUU_HA: "MAO",
            QUOC_AN: "TY_SNAKE",
            DUONG_PHU: "DAN",
            VAN_TINH: "TY",
            THIEN_KHOI: "NGO",
            THIEN_VIET: "DAN",
            THIEN_QUAN: "DAU",
            THIEN_PHUC: "TY_SNAKE",
            THIEN_TRU: "NGO",
            TRIET_KHONG: ["THIN", "TY_SNAKE"]
        },
        NHAM: {
            DA_LA: "TUAT",
            KINH_DUONG: "TY",
            LUU_HA: "HOI",
            QUOC_AN: "MUI",
            DUONG_PHU: "THIN",
            VAN_TINH: "DAU",
            THIEN_KHOI: "TY",
            THIEN_VIET: "THAN",
            THIEN_QUAN: "TUAT",
            THIEN_PHUC: "NGO",
            THIEN_TRU: "DAU",
            TRIET_KHONG: ["DAN", "MAO"]
        },
        QUY: {
            DA_LA: "HOI",
            KINH_DUONG: "SUU",
            LUU_HA: "DAN",
            QUOC_AN: "THAN",
            DUONG_PHU: "TY_SNAKE",
            VAN_TINH: "MAO",
            THIEN_KHOI: "MAO",
            THIEN_VIET: "TY_SNAKE",
            THIEN_QUAN: "NGO",
            THIEN_PHUC: "TY_SNAKE",
            THIEN_TRU: "TUAT",
            TRIET_KHONG: ["TY", "SUU"]
        }
    };
  
    const saoCan = saoCanTable[canKey];
    if (saoCan) {
      Object.entries(saoCan).forEach(([key, chi]) => {
        if (Array.isArray(chi)) {
          result[PhuTinh[key].name] = chi.map(c => ConGiap[c]); // Triệt: 2 cung
        } else {
          result[PhuTinh[key].name] = ConGiap[chi];
        }
      });
    }
  
    return result;
}

export function anSaoTheoDiaChi(yinBirthDate) {
    const result = {};
    const { chiKey } = anCanChi(yinBirthDate); // lấy Địa chi năm sinh
    if (!chiKey) return null;
  
    // Bảng tra theo địa chi tuổi (16 sao)
    const diaChiTable = {
      TY: {
        PHUONG_CAC: "TUAT", GIAI_THAN: "TUAT", LONG_TRI: "THIN", NGUYET_DUC: "TY", THIEN_DUC: "DAU",
        THIEN_HY: "DAU", THIEN_MA: "DAN", THIEN_KHOC: "NGO", THIEN_HU: "NGO", DAO_HOA: "DAU",
        HONG_LOAN: "MAO", HOA_CAI: "THIN", KIEP_SAT: "TY", PHA_TOAI: "TY", CO_THAN: "DAN", QUA_TU: "TUAT"
      },
      SUU: {
        PHUONG_CAC: "DAU", GIAI_THAN: "DAU", LONG_TRI: "TY", NGUYET_DUC: "NGO", THIEN_DUC: "TUAT",
        THIEN_HY: "THAN", THIEN_MA: "HOI", THIEN_KHOC: "TY", THIEN_HU: "MUI", DAO_HOA: "NGO",
        HONG_LOAN: "DAN", HOA_CAI: "SUU", KIEP_SAT: "DAN", PHA_TOAI: "SUU", CO_THAN: "DAN", QUA_TU: "TUAT"
      },
      DAN: {
        PHUONG_CAC: "THAN", GIAI_THAN: "THAN", LONG_TRI: "NGO", NGUYET_DUC: "MUI", THIEN_DUC: "HOI",
        THIEN_HY: "MUI", THIEN_MA: "THAN", THIEN_KHOC: "THIN", THIEN_HU: "THAN", DAO_HOA: "MAO",
        HONG_LOAN: "SUU", HOA_CAI: "TUAT", KIEP_SAT: "HOI", PHA_TOAI: "DAU", CO_THAN: "TY", QUA_TU: "SUU"
      },
      MAO: {
        PHUONG_CAC: "MUI", GIAI_THAN: "MUI", LONG_TRI: "MUI", NGUYET_DUC: "THAN", THIEN_DUC: "TY",
        THIEN_HY: "NGO", THIEN_MA: "TY", THIEN_KHOC: "MAO", THIEN_HU: "DAU", DAO_HOA: "TY",
        HONG_LOAN: "TY", HOA_CAI: "MUI", KIEP_SAT: "THAN", PHA_TOAI: "TY", CO_THAN: "TY", QUA_TU: "SUU"
      },
      THIN: {
        PHUONG_CAC: "NGO", GIAI_THAN: "NGO", LONG_TRI: "THAN", NGUYET_DUC: "DAU", THIEN_DUC: "SUU",
        THIEN_HY: "TY", THIEN_MA: "DAN", THIEN_KHOC: "DAN", THIEN_HU: "TUAT", DAO_HOA: "DAU",
        HONG_LOAN: "HOI", HOA_CAI: "THIN", KIEP_SAT: "TY", PHA_TOAI: "SUU", CO_THAN: "TY", QUA_TU: "SUU"
      },
      TY_SNAKE: {
        PHUONG_CAC: "TY", GIAI_THAN: "TY", LONG_TRI: "DAU", NGUYET_DUC: "TUAT", THIEN_DUC: "DAN",
        THIEN_HY: "THIN", THIEN_MA: "HOI", THIEN_KHOC: "SUU", THIEN_HU: "HOI", DAO_HOA: "NGO",
        HONG_LOAN: "TUAT", HOA_CAI: "SUU", KIEP_SAT: "DAN", PHA_TOAI: "DAU", CO_THAN: "THAN", QUA_TU: "THIN"
      },
      NGO: {
        PHUONG_CAC: "THIN", GIAI_THAN: "THIN", LONG_TRI: "TUAT", NGUYET_DUC: "HOI", THIEN_DUC: "MAO",
        THIEN_HY: "MAO", THIEN_MA: "THAN", THIEN_KHOC: "TY", THIEN_HU: "TY", DAO_HOA: "MAO",
        HONG_LOAN: "DAU", HOA_CAI: "TUAT", KIEP_SAT: "HOI", PHA_TOAI: "TY", CO_THAN: "THAN", QUA_TU: "THIN"
      },
      MUI: {
        PHUONG_CAC: "MAO", GIAI_THAN: "MAO", LONG_TRI: "HOI", NGUYET_DUC: "TY", THIEN_DUC: "THIN",
        THIEN_HY: "DAN", THIEN_MA: "TY", THIEN_KHOC: "HOI", THIEN_HU: "SUU", DAO_HOA: "TY",
        HONG_LOAN: "THAN", HOA_CAI: "MUI", KIEP_SAT: "THAN", PHA_TOAI: "SUU", CO_THAN: "THAN", QUA_TU: "THIN"
      },
      THAN: {
        PHUONG_CAC: "DAN", GIAI_THAN: "DAN", LONG_TRI: "TY", NGUYET_DUC: "SUU", THIEN_DUC: "TY",
        THIEN_HY: "SUU", THIEN_MA: "DAN", THIEN_KHOC: "TUAT", THIEN_HU: "DAN", DAO_HOA: "DAU",
        HONG_LOAN: "MUI", HOA_CAI: "THIN", KIEP_SAT: "TY", PHA_TOAI: "DAU", CO_THAN: "HOI", QUA_TU: "MUI"
      },
      DAU: {
        PHUONG_CAC: "SUU", GIAI_THAN: "SUU", LONG_TRI: "SUU", NGUYET_DUC: "DAN", THIEN_DUC: "NGO",
        THIEN_HY: "TY", THIEN_MA: "HOI", THIEN_KHOC: "DAU", THIEN_HU: "MAO", DAO_HOA: "NGO",
        HONG_LOAN: "NGO", HOA_CAI: "SUU", KIEP_SAT: "DAN", PHA_TOAI: "TY", CO_THAN: "HOI", QUA_TU: "MUI"
      },
      TUAT: {
        PHUONG_CAC: "TY", GIAI_THAN: "TY", LONG_TRI: "DAN", NGUYET_DUC: "MAO", THIEN_DUC: "MUI",
        THIEN_HY: "HOI", THIEN_MA: "THAN", THIEN_KHOC: "THAN", THIEN_HU: "THIN", DAO_HOA: "MAO",
        HONG_LOAN: "TY", HOA_CAI: "TUAT", KIEP_SAT: "HOI", PHA_TOAI: "SUU", CO_THAN: "HOI", QUA_TU: "MUI"
      },
      HOI: {
        PHUONG_CAC: "HOI", GIAI_THAN: "HOI", LONG_TRI: "MAO", NGUYET_DUC: "THIN", THIEN_DUC: "THAN",
        THIEN_HY: "TUAT", THIEN_MA: "TY", THIEN_KHOC: "MUI", THIEN_HU: "TY", DAO_HOA: "TY",
        HONG_LOAN: "THIN", HOA_CAI: "MUI", KIEP_SAT: "THAN", PHA_TOAI: "DAU", CO_THAN: "DAN", QUA_TU: "TUAT"
      }
    };
  
    const saoChi = diaChiTable[chiKey];
    if (saoChi) {
      Object.entries(saoChi).forEach(([key, cung]) => {
        result[PhuTinh[key].name] = ConGiap[cung];
      });
    }
  
    // 3️⃣ Tuần Không
    // Bảng Tuần Không theo năm Giáp
    const tuanKhongTable = {
        GIAP_TY:   ["TUAT", "HOI"],
        GIAP_DAN:  ["TY", "SUU"],
        GIAP_THIN: ["MAO", "DAN"],
        GIAP_NGO:  ["THIN", "TY_SNAKE"],
        GIAP_THAN: ["NGO", "MUI"],
        GIAP_TUAT: ["THAN", "DAU"]
    };

    // Tìm năm Giáp gần nhất <= năm sinh
    const year = yinBirthDate.year;
    const cycle = 60; // lục thập hoa giáp
    let offset = (year - 4) % cycle; // 1984 là Giáp Tý (offset 0)
    let nearestGiapOffset = offset - (offset % 10); // lùi về can Giáp gần nhất
    const giapIndex = nearestGiapOffset % cycle;

    const giapKeyList = ["GIAP_TY", "GIAP_DAN", "GIAP_THIN", "GIAP_NGO", "GIAP_THAN", "GIAP_TUAT"];
    const chiIndex = giapIndex % 12; // địa chi trong năm Giáp đó
    let giapKey;
    switch (chiIndex) {
        case 0: giapKey = "GIAP_TY"; break;
        case 2: giapKey = "GIAP_DAN"; break;
        case 4: giapKey = "GIAP_THIN"; break;
        case 6: giapKey = "GIAP_NGO"; break;
        case 8: giapKey = "GIAP_THAN"; break;
        case 10: giapKey = "GIAP_TUAT"; break;
        default: giapKey = null;
    }

    if (giapKey && tuanKhongTable[giapKey]) {
        result[PhuTinh.TUAN_KHONG.name] = tuanKhongTable[giapKey].map(c => ConGiap[c]);
    }

    return result;
}
    

/*
    Utils functions
*/

export function convertBirthToYin(birthDate) {
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
  

/* 
    Internal functions 
*/

const mod = (n, m) => ((n % m) + m) % m;

function getConGiapByNumber(num) {
  const normalized = mod(num - 1, 12) + 1;
  for (const key in ConGiap) {
    if (ConGiap[key].number === normalized) return ConGiap[key];
  }
  return null;
}

function getConGiapByHour(hour) {
  for (const key in ConGiap) {
    const g = ConGiap[key];
    if (
      (g.hour_from <= g.hour_to && hour >= g.hour_from && hour < g.hour_to) ||
      (g.hour_from > g.hour_to && (hour >= g.hour_from || hour < g.hour_to)) // wrap (e.g., 23–1)
    ) {
      return g;
    }
  }
  return null;
}

function getThienPhuKey(tuViKey) {
    return ThienPhuMap[tuViKey] || null;
}

const ThienPhuMap = {
    TY: "THIN",
    SUU: "MAO",
    DAN: "DAN",
    MAO: "SUU",
    THIN: "TY",
    TY_SNAKE: "HOI",
    NGO: "TUAT",
    MUI: "DAU",
    THAN: "THAN",
    DAU: "MUI",
    TUAT: "NGO",
    HOI: "TY_SNAKE"
};
    