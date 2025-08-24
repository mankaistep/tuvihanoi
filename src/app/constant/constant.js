export const GioiTinh = {
    NAM: { name: 'Nam' },
    NU: { name: 'Nữ' }
}

export const AmDuong = {
    AM: { name: 'Âm' },
    DUONG: { name: 'Dương' }
}

export const NguHanh = {
    KIM: { name: 'Kim' },
    MOC: { name: 'Mộc' },
    THUY: { name: 'Thủy' },
    HOA: { name: 'Hỏa' },
    THO: { name: 'Thổ' }
}

// Thập Thiên Can
export const ThienCan = {
    GIAP:  { name: 'Giáp', am_duong: AmDuong.DUONG, ngu_hanh: NguHanh.MOC },
    AT:    { name: 'Ất',   am_duong: AmDuong.AM,    ngu_hanh: NguHanh.MOC },
    BINH:  { name: 'Bính', am_duong: AmDuong.DUONG, ngu_hanh: NguHanh.HOA },
    DINH:  { name: 'Đinh', am_duong: AmDuong.AM,    ngu_hanh: NguHanh.HOA },
    MAU:   { name: 'Mậu',  am_duong: AmDuong.DUONG, ngu_hanh: NguHanh.THO },
    KY:    { name: 'Kỷ',   am_duong: AmDuong.AM,    ngu_hanh: NguHanh.THO },
    CANH:  { name: 'Canh', am_duong: AmDuong.DUONG, ngu_hanh: NguHanh.KIM },
    TAN:   { name: 'Tân',  am_duong: AmDuong.AM,    ngu_hanh: NguHanh.KIM },
    NHAM:  { name: 'Nhâm', am_duong: AmDuong.DUONG, ngu_hanh: NguHanh.THUY },
    QUY:   { name: 'Quý',  am_duong: AmDuong.AM,    ngu_hanh: NguHanh.THUY }
}

// Thập Nhị Địa Chi (12 con giáp)
export const ConGiap = {
    TY: {
      key: "TY",
      name: 'Tý',
      number: 1,
      hour_from: 23,
      hour_to: 1,
      am_duong: AmDuong.DUONG,
      ngu_hanh: NguHanh.THUY
    },
    SUU: {
      key: "SUU",
      name: 'Sửu',
      number: 2,
      hour_from: 1,
      hour_to: 3,
      am_duong: AmDuong.AM,
      ngu_hanh: NguHanh.THO
    },
    DAN: {
      key: "DAN",
      name: 'Dần',
      number: 3,
      hour_from: 3,
      hour_to: 5,
      am_duong: AmDuong.DUONG,
      ngu_hanh: NguHanh.MOC
    },
    MAO: {
      key: "MAO",
      name: 'Mão',
      number: 4,
      hour_from: 5,
      hour_to: 7,
      am_duong: AmDuong.AM,
      ngu_hanh: NguHanh.MOC
    },
    THIN: {
      key: "THIN",
      name: 'Thìn',
      number: 5,
      hour_from: 7,
      hour_to: 9,
      am_duong: AmDuong.DUONG,
      ngu_hanh: NguHanh.THO
    },
    TY_SNAKE: {
      key: "TY_SNAKE",
      name: 'Tỵ',
      number: 6,
      hour_from: 9,
      hour_to: 11,
      am_duong: AmDuong.AM,
      ngu_hanh: NguHanh.HOA
    },
    NGO: {
      key: "NGO",
      name: 'Ngọ',
      number: 7,
      hour_from: 11,
      hour_to: 13,
      am_duong: AmDuong.DUONG,
      ngu_hanh: NguHanh.HOA
    },
    MUI: {
      key: "MUI",
      name: 'Mùi',
      number: 8,
      hour_from: 13,
      hour_to: 15,
      am_duong: AmDuong.AM,
      ngu_hanh: NguHanh.THO
    },
    THAN: {
      key: "THAN",
      name: 'Thân',
      number: 9,
      hour_from: 15,
      hour_to: 17,
      am_duong: AmDuong.DUONG,
      ngu_hanh: NguHanh.KIM
    },
    DAU: {
      key: "DAU",
      name: 'Dậu',
      number: 10,
      hour_from: 17,
      hour_to: 19,
      am_duong: AmDuong.AM,
      ngu_hanh: NguHanh.KIM
    },
    TUAT: {
      key: "TUAT",
      name: 'Tuất',
      number: 11,
      hour_from: 19,
      hour_to: 21,
      am_duong: AmDuong.DUONG,
      ngu_hanh: NguHanh.THO
    },
    HOI: {
      key: "HOI",
      name: 'Hợi',
      number: 12,
      hour_from: 21,
      hour_to: 23,
      am_duong: AmDuong.AM,
      ngu_hanh: NguHanh.THUY
    }
}

// 12 Cung
export const Cung = {
    MENH: { name: "Mệnh" },
    PHU_MAU: { name: "Phụ Mẫu" },
    PHUC_DUC: { name: "Phúc Đức" },
    DIEN_TRACH: { name: "Điền Trạch" },
    QUAN_LOC: { name: "Quan Lộc" },
    NO_BOC: { name: "Nô Bộc" },
    THIEN_DI: { name: "Thiên Di" },
    TAT_ACH: { name: "Tật Ách" },
    TAI_BACH: { name: "Tài Bạch" },
    TU_TUC: { name: "Tử Tức" },
    PHU_THE: { name: "Phu Thê" },
    HUYNH_DE: { name: "Huynh Đệ" }
}

// Cục (Ngũ hành + số cục)
export const Cuc = {
    THUY_NHI: { name: "Thủy nhị cục", number: 2, ngu_hanh: NguHanh.THUY },
    MOC_TAM:  { name: "Mộc tam cục",  number: 3, ngu_hanh: NguHanh.MOC },
    KIM_TU:   { name: "Kim tứ cục",   number: 4, ngu_hanh: NguHanh.KIM },
    THO_NGU:  { name: "Thổ ngũ cục",  number: 5, ngu_hanh: NguHanh.THO },
    HOA_LUC:  { name: "Hỏa lục cục",  number: 6, ngu_hanh: NguHanh.HOA }
}

export const BanMenh = {
    HAI_TRUNG_KIM: { name: "Hải trung kim", ngu_hanh: NguHanh.KIM },
    LO_TRUNG_HOA: { name: "Lô trung hỏa", ngu_hanh: NguHanh.HOA },
    DAI_LAM_MOC: { name: "Đại lâm mộc", ngu_hanh: NguHanh.MOC },
    LO_BANG_THO: { name: "Lộ bàng thổ", ngu_hanh: NguHanh.THO },
    KIEM_PHONG_KIM: { name: "Kiếm phong kim", ngu_hanh: NguHanh.KIM },
    SON_DAU_HOA: { name: "Sơn đầu hỏa", ngu_hanh: NguHanh.HOA },
    GIAN_HA_THUY: { name: "Giản hạ thủy", ngu_hanh: NguHanh.THUY },
    THANH_DAU_THO: { name: "Thành đầu thổ", ngu_hanh: NguHanh.THO },
    BACH_LAP_KIM: { name: "Bạch lạp kim", ngu_hanh: NguHanh.KIM },
    DUONG_LIEU_MOC: { name: "Dương liễu mộc", ngu_hanh: NguHanh.MOC },
    TUYEN_TRUNG_THUY: { name: "Tuyền trung thủy", ngu_hanh: NguHanh.THUY },
    OC_THUONG_THO: { name: "Ốc thượng thổ", ngu_hanh: NguHanh.THO },
    TICH_LICH_HOA: { name: "Tích lịch hỏa", ngu_hanh: NguHanh.HOA },
    TONG_BACH_MOC: { name: "Tòng bách mộc", ngu_hanh: NguHanh.MOC },
    TRANG_LUU_THUY: { name: "Tràng lưu thủy", ngu_hanh: NguHanh.THUY },
    SA_TRUNG_KIM: { name: "Sa trung kim", ngu_hanh: NguHanh.KIM },
    SON_HA_HOA: { name: "Sơn hạ hỏa", ngu_hanh: NguHanh.HOA },
    BINH_DIA_MOC: { name: "Bình địa mộc", ngu_hanh: NguHanh.MOC },
    BICH_THUONG_THO: { name: "Bích thượng thổ", ngu_hanh: NguHanh.THO },
    KIM_BACH_KIM: { name: "Kim bạch kim", ngu_hanh: NguHanh.KIM },
    PHU_DANG_HOA: { name: "Phú đăng hỏa", ngu_hanh: NguHanh.HOA },
    THIEN_HA_THUY: { name: "Thiên hà thủy", ngu_hanh: NguHanh.THUY },
    DAI_TRACH_THO: { name: "Đại trạch thổ", ngu_hanh: NguHanh.THO },
    XUYEN_THOA_KIM: { name: "Xuyến thoa kim", ngu_hanh: NguHanh.KIM },
    TANG_DO_MOC: { name: "Tang đố mộc", ngu_hanh: NguHanh.MOC },
    DAI_KHE_THUY: { name: "Đại khê thủy", ngu_hanh: NguHanh.THUY },
    SA_TRUNG_THO: { name: "Sa trung thổ", ngu_hanh: NguHanh.THO },
    THIEN_THUONG_HOA: { name: "Thiên thượng hỏa", ngu_hanh: NguHanh.HOA },
    THACH_LUU_MOC: { name: "Thạch lựu mộc", ngu_hanh: NguHanh.MOC },
    DAI_HAI_THUY: { name: "Đại hải thủy", ngu_hanh: NguHanh.THUY },
}

export const AmDuongNamNu = {
    DUONG_NAM: { name: "Dương Nam" },
    AM_NAM: { name: "Âm Nam" },
    DUONG_NU: { name: "Dương Nữ" },
    AM_NU: { name: "Âm Nữ" }
}

export const TuViTable = {
    2: { // Thủy Nhị Cục
      "08": "DAN", "09": "DAN",
      "10": "MAO", "11": "MAO",
      "12": "THIN", "13": "THIN",
      "14": "TY_SNAKE", "15": "TY_SNAKE",
      "06": "TY", "07": "TY", "30": "TY",
      "16": "NGO", "17": "NGO",
      "04": "SUU", "05": "SUU",
      "28": "DAU", "29": "DAU",
      "18": "MUI", "19": "MUI",
      "02": "HOI", "03": "HOI",
      "26": "DAU", "27": "DAU",
      "01": "TY", "24": "TY", "25": "TY",
      "22": "TUAT", "23": "TUAT",
      "20": "MUI", "21": "MUI"
    },
    3: { // Mộc Tam Cục
      "04": "TY", "12": "TY", "14": "TY",
      "07": "NGO", "15": "NGO", "17": "NGO",
      "10": "DAU", "18": "DAU", "20": "DAU",
      "13": "HOI", "21": "HOI", "23": "HOI",
      "01": "TY", "09": "TY", "11": "TY",
      "16": "SUU", "24": "SUU", "26": "SUU",
      "06": "DAN", "08": "DAN",
      "19": "MAO", "27": "MAO", "29": "MAO",
      "05": "THIN", "03": "THIN",
      "02": "NGO", "28": "NGO",
      "25": "MUI",
      "22": "THAN", "30": "THAN"
    },
    4: { // Kim Tứ Cục
      "06": "TY", "16": "TY",
      "19": "SUU", "25": "SUU",
      "10": "DAN", "20": "DAN",
      "23": "MAO", "29": "MAO",
      "14": "THIN", "24": "THIN", "27": "THIN",
      "18": "TY_SNAKE", "28": "TY_SNAKE",
      "02": "NGO", "12": "NGO",
      "15": "MUI", "21": "MUI",
      "08": "THAN", "11": "THAN", "17": "THAN",
      "22": "DAU",
      "26": "TUAT",
      "04": "HOI", "07": "HOI", "13": "HOI",
      "03": "TY", "09": "TY",
      "05": "SUU",
      "01": "DAN", "30": "DAN",
      "08": "MAO", "20": "MAO", "24": "MAO",
      "01": "THIN", "13": "THIN",
      "25": "TY_SNAKE", "29": "TY_SNAKE",
      "06": "NGO", "18": "NGO", "30": "NGO",
      "11": "MUI", "23": "MUI",
      "03": "THAN", "15": "THAN",
      "19": "DAU", "27": "DAU"
    },
    5: { // Thổ Ngũ Cục
      "16": "TY",
      "28": "SUU",
      "10": "DAN", "14": "DAN", "22": "DAN",
      "21": "MAO",
      "05": "THIN", "09": "THIN", "17": "THIN",
      "04": "TY_SNAKE", "12": "TY_SNAKE",
      "07": "NGO",
      "02": "MUI", "26": "MUI",
      "10": "THAN", "24": "THAN", "29": "THAN",
      "02": "DAU", "16": "DAU", "30": "DAU",
      "08": "TUAT", "22": "TUAT",
      "14": "HOI", "28": "HOI",
      "04": "SUU", "18": "SUU", "23": "SUU"
    },
    6: { // Hỏa Lục Cục
      "01": "TY", "20": "TY",
      "12": "SUU", "17": "SUU", "27": "SUU",
      "07": "DAN", "26": "DAN",
      "06": "MAO", "11": "MAO", "21": "MAO",
      "05": "THIN", "15": "THIN", "25": "THIN",
      "09": "TY_SNAKE", "19": "TY_SNAKE",
      "03": "NGO", "13": "NGO"
    }
}

export const ChinhTinh = {
    TU_VI: { name: "Tử Vi" },
    THIEN_PHU: { name: "Thiên Phủ" },
    THIEN_CO: { name: "Thiên Cơ" },
    THAI_DUONG: { name: "Thái Dương" },
    VU_KHUC: { name: "Vũ Khúc" },
    THIEN_DONG: { name: "Thiên Đồng" },
    LIEM_TRINH: { name: "Liêm Trinh" },
    THAI_AM: { name: "Thái Âm" },
    THAM_LANG: { name: "Tham Lang" },
    CU_MON: { name: "Cự Môn" },
    THIEN_TUONG: { name: "Thiên Tướng" },
    THIEN_LUONG: { name: "Thiên Lương" },
    THAT_SAT: { name: "Thất Sát" },
    PHA_QUAN: { name: "Phá Quân" },
}

export const VongTruongSinh = {
    TRUONG_SINH: { name: "Trường Sinh" },
    MOC_DUC: { name: "Mộc Dục" },
    QUAN_DOI: { name: "Quan Đới" },
    LAM_QUAN: { name: "Lâm Quan" },
    DE_VUONG: { name: "Đế Vượng" },
    SUY: { name: "Suy" },
    BENH: { name: "Bệnh" },
    TU: { name: "Tử" },
    MO: { name: "Mộ" },
    TUYET: { name: "Tuyệt" },
    THAI: { name: "Thai" },
    DUONG: { name: "Dưỡng" }
}
  
  