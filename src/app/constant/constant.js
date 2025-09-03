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
    TU_VI: { 
        key: "TU_VI", 
        name: "Tử Vi", 
        am_duong: AmDuong.DUONG, 
        ngu_hanh: NguHanh.THO,
        hoa_khi: "Tôn Quý",
        tinh_chu: [
            Cung.PHUC_DUC,
            Cung.QUAN_LOC
        ],
        y_nghia: [
            "Tượng trưng cho quyền lực tối cao, sự uy nghiêm, lãnh đạo và sự cai quản."
        ]
    },
    THIEN_PHU: {
        key: "THIEN_PHU", 
        name: "Thiên Phủ", 
        am_duong: AmDuong.AM, 
        ngu_hanh: NguHanh.THO,
        hoa_khi: "Lệnh",
        tinh_chu: [
            Cung.TAI_BACH,
            Cung.DIEN_TRACH
        ],
        y_nghia: [
            "Tượng trưng cho sự ổn định, giàu có, quản lý và bảo vệ tài sản."
        ]
    },
    THIEN_CO: {
        key: "THIEN_CO",
        name: "Thiên Cơ",
        am_duong: AmDuong.AM,
        ngu_hanh: NguHanh.MOC,
        hoa_khi: "Thiện",
        tinh_chu: [
            Cung.HUYNH_DE
        ],
        y_nghia: [
          "Trưng cho sự sáng tạo, thông minh, khả năng lập kế hoạch và thích nghi."
        ]
      },
    THAI_DUONG: {
        key: "THAI_DUONG",
        name: "Thái Dương",
        am_duong: AmDuong.DUONG,
        ngu_hanh: NguHanh.HOA,
        hoa_khi: "Quý", 
        tinh_chu: [
            Cung.QUAN_LOC
        ],
        y_nghia: [
          "Biểu thị trí tuệ, sự mạnh mẽ, năng động và vươn lên.",
          "Tượng trưng cho danh lợi"
        ]
      },
    VU_KHUC: {
        key: "VU_KHUC",
        name: "Vũ Khúc",
        am_duong: AmDuong.AM, 
        ngu_hanh: NguHanh.KIM, 
        hoa_khi: "Tài tinh", 
        tinh_chu: [
            Cung.TAI_BACH
        ],
        y_nghia: [
          "Chủ về tiền bạc, tính toán, và sự quyết đoán."
        ]
    },
    LIEM_TRINH: {
        key: "LIEM_TRINH",
        name: "Liêm Trinh",
        am_duong: AmDuong.AM,
        ngu_hanh: NguHanh.HOA,
        hoa_khi: "Tù tinh",
        tinh_chu: [
            Cung.QUAN_LOC
        ],
        y_nghia: [
            "Chủ về sự kiên trì, đạo đức, nhưng cũng có thể biểu thị sự gò bó, thử thách."
        ]
    },
    THAI_AM: {
        key: "THAI_AM",
        name: "Thái Âm",
        am_duong: AmDuong.AM,
        ngu_hanh: AmDuong.THUY,
        hoa_khi: "Phú",
        tinh_chu: [
            Cung.TAI_BACH,
            Cung.DIEN_TRACH
        ],
        y_nghia: [
            "Chủ về sự dịu dàng, cảm xúc, tài lộc, sự chiếu sáng âm thầm và hỗ trợ."
        ]
    },
    THAM_LANG: {
        key: "THAM_LANG",
        name: "Tham Lang",
        am_duong: AmDuong.AM,
        ngu_hanh: NguHanh.THUY,
        hoa_khi: "Đào hoa",
        tinh_chu: [],
        y_nghia: [
            "Chủ về đam mê, thú vui, sự thu hút, và tìm kiếm những trải nghiệm mới lạ."
        ]
    },
    CU_MON: {
        key: "CU_MON",
        name: "Cự Môn",
        am_duong: AmDuong.AM,
        ngu_hanh: NguHanh.THUY,
        hoa_khi: "Ám tinh",
        tinh_chu: [],
        y_nghia: [
            "Chủ về lời nói, sự đối lập, thị phi, nhưng cũng là biểu thị của tri thức và giao tiếp."
        ]
    },
    THIEN_TUONG: {
        key: "THIEN_TUONG",
        name: "Thiên Tướng",
        am_duong: AmDuong.DUONG,
        ngu_hanh: NguHanh.THUY,
        hoa_khi: "Ấn tinh",
        tinh_chu: [
            Cung.QUAN_LOC
        ],
        y_nghia: [
          "Chủ về lòng trung thành, sự uy nghi và hỗ trợ từ quý nhân."
        ]
    },
    THIEN_LUONG: {
        key: "THIEN_LUONG",
        name: "Thiên Lương",
        am_duong: AmDuong.AM,
        ngu_hanh: NguHanh.MOC,
        hoa_khi: "Ấm tinh",
        tinh_chu: [
            Cung.PHU_MAU
        ],
        y_nghia: [
            "Chủ về sự che chở, lòng nhân từ và sự an toàn."
        ]
    },
    THAT_SAT: {
        key: "THAT_SAT",
        name: "Thất Sát",
        am_duong: AmDuong.DUONG,
        ngu_hanh: NguHanh.KIM,
        hoa_khi: "Tướng",
        tinh_chu: [],
        y_nghia: [
            "Tượng trưng cho sức mạnh, sự quyết liệt, dám đột phá và chấp nhận rủi ro."
        ]
    },
    PHA_QUAN: {
        key: "PHA_QUAN",
        name: "Phá Quân",
        am_duong: AmDuong.AM,
        ngu_hanh: NguHanh.THUY,
        hoa_khi: "Hao",
        tinh_chu: [
            Cung.PHU_THE,
            Cung.TU_TUC,
            Cung.NO_BOC
        ],
        y_nghia: [
          "Chủ về sự thay đổi, phá bỏ cái cũ, làm mới, và sự quyết liệt trong hành động."
        ]
    },
    THIEN_DONG: {
        key: "THIEN_DONG",
        name: "Thiên Đồng",
        am_duong: AmDuong.DUONG,
        ngu_hanh: NguHanh.THUY,
        hoa_khi: "Phúc tinh",
        tinh_chu: [
            Cung.PHUC_DUC
        ],
        y_nghia: [
          "Biểu thị sự vui vẻ, lạc quan, sự dễ chịu và khả năng thích nghi linh hoạt",
        ]
    }
};
  

export const VongTruongSinh = {
    TRUONG_SINH: { key: "TRUONG_SINH", name: "Trường Sinh" },
    MOC_DUC:     { key: "MOC_DUC", name: "Mộc Dục" },
    QUAN_DOI:    { key: "QUAN_DOI", name: "Quan Đới" },
    LAM_QUAN:    { key: "LAM_QUAN", name: "Lâm Quan" },
    DE_VUONG:    { key: "DE_VUONG", name: "Đế Vượng" },
    SUY:         { key: "SUY", name: "Suy" },
    BENH:        { key: "BENH", name: "Bệnh" },
    TU:          { key: "TU", name: "Tử" },
    MO:          { key: "MO", name: "Mộ" },
    TUYET:       { key: "TUYET", name: "Tuyệt" },
    THAI:        { key: "THAI", name: "Thai" },
    DUONG:       { key: "DUONG", name: "Dưỡng" }
  };
  

export const PhuTinh = {
    // Vòng Lộc Tồn
    LOC_TON:    { key: "LOC_TON", name: "Lộc Tồn", type: "cat", ngu_hanh: NguHanh.THO, sao_key: true },
    BAC_SI:     { key: "BAC_SI", name: "Bác Sĩ", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: false },
    LUC_SI:     { key: "LUC_SI", name: "Lực Sĩ", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: false },
    THANH_LONG: { key: "THANH_LONG", name: "Thanh Long", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: false },
    TIEU_HAO:   { key: "TIEU_HAO", name: "Tiểu Hao", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    TUONG_QUAN: { key: "TUONG_QUAN", name: "Tướng Quân", type: "sat", ngu_hanh: NguHanh.MOC, sao_key: false },
    TAU_THU:    { key: "TAU_THU", name: "Tấu Thư", type: "cat", ngu_hanh: NguHanh.KIM, sao_key: false },
    PHI_LIEM:   { key: "PHI_LIEM", name: "Phi Liêm", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    HI_THAN:   { key: "HI_THAN", name: "Hỷ Thần", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: false },
    BENH_PHU:   { key: "BENH_PHU", name: "Bệnh Phù", type: "sat", ngu_hanh: NguHanh.THO, sao_key: false },
    DAI_HAO:    { key: "DAI_HAO", name: "Đại Hao", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    PHUC_BINH:  { key: "PHUC_BINH", name: "Phục Binh", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    QUAN_PHU:   { key: "QUAN_PHU", name: "Quan Phủ", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
  
    // Vòng Thái Tuế
    THAI_TUE:    { key: "THAI_TUE", name: "Thái Tuế", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: true },
    THIEU_DUONG: { key: "THIEU_DUONG", name: "Thiếu Dương", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: false },
    TANG_MON:    { key: "TANG_MON", name: "Tang Môn", type: "sat", ngu_hanh: NguHanh.MOC, sao_key: false },
    THIEU_AM:    { key: "THIEU_AM", name: "Thiếu Âm", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: false },
    QUAN_PHU_TT: { key: "QUAN_PHU_TT", name: "Quan Phù", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    TU_PHU:      { key: "TU_PHU", name: "Tử Phù", type: "sat", ngu_hanh: NguHanh.KIM, sao_key: false },
    TUE_PHA:     { key: "TUE_PHA", name: "Tuế Phá", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: true },
    LONG_DUC:    { key: "LONG_DUC", name: "Long Đức", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: true },
    BACH_HO:     { key: "BACH_HO", name: "Bạch Hổ", type: "sat", ngu_hanh: NguHanh.KIM, sao_key: false },
    PHUC_DUC: { key: "PHUC_DUC", name: "Phúc Đức", type: "cat", ngu_hanh: NguHanh.THO, sao_key: true },
    DIEU_KHACH:  { key: "DIEU_KHACH", name: "Điếu Khách", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    TRUC_PHU:    { key: "TRUC_PHU", name: "Trực Phù", type: "sat", ngu_hanh: NguHanh.KIM, sao_key: false },
  
    // Tứ Hóa
    HOA_LOC:   { key: "HOA_LOC", name: "Hóa Lộc", type: "cat", ngu_hanh: NguHanh.MOC, sao_key: true },
    HOA_QUYEN: { key: "HOA_QUYEN", name: "Hóa Quyền", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: true },
    HOA_KHOA:  { key: "HOA_KHOA", name: "Hóa Khoa", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: true },
    HOA_KY:    { key: "HOA_KY", name: "Hóa Kỵ", type: "sat", ngu_hanh: NguHanh.THUY, sao_key: true },
  
    // Tuần Không
    TUAN_KHONG: { key: "TUAN_KHONG", name: "Tuần Không", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    TRIET_KHONG:{ key: "TRIET_KHONG", name: "Triệt Không", type: "sat", ngu_hanh: NguHanh.KIM, sao_key: false },
  
    // Các sao theo Thiên Can
    DA_LA:      { key: "DA_LA", name: "Đà La", type: "sat", ngu_hanh: NguHanh.KIM, sao_key: true },
    KINH_DUONG: { key: "KINH_DUONG", name: "Kình Dương", type: "sat", ngu_hanh: NguHanh.KIM, sao_key: true },
    LUU_HA:     { key: "LUU_HA", name: "Lưu Hà", type: "sat", ngu_hanh: NguHanh.THUY, sao_key: false },
    QUOC_AN:    { key: "QUOC_AN", name: "Quốc Ấn", type: "cat", ngu_hanh: NguHanh.MOC, sao_key: false },
    DUONG_PHU:  { key: "DUONG_PHU", name: "Đường Phù", type: "cat", ngu_hanh: NguHanh.MOC, sao_key: false },
    VAN_TINH:   { key: "VAN_TINH", name: "Văn Tinh", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: false },
    THIEN_KHOI: { key: "THIEN_KHOI", name: "Thiên Khôi", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: true },
    THIEN_VIET: { key: "THIEN_VIET", name: "Thiên Việt", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: true },
    THIEN_QUAN: { key: "THIEN_QUAN", name: "Thiên Quan", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: false },
    THIEN_PHUC: { key: "THIEN_PHUC", name: "Thiên Phúc", type: "cat", ngu_hanh: NguHanh.THO, sao_key: true },
    THIEN_TRU:  { key: "THIEN_TRU", name: "Thiên Trù", type: "cat", ngu_hanh: NguHanh.THO, sao_key: true },
  
    // Sao theo Địa Chi
    PHUONG_CAC:{ key: "PHUONG_CAC", name: "Phượng Các", type: "cat", ngu_hanh: NguHanh.THO, sao_key: true },
    GIAI_THAN: { key: "GIAI_THAN", name: "Giải Thần", type: "cat", ngu_hanh: NguHanh.MOC, sao_key: false },
    LONG_TRI:  { key: "LONG_TRI", name: "Long Trì", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: true },
    NGUYET_DUC:{ key: "NGUYET_DUC", name: "Nguyệt Đức", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: false },
    THIEN_DUC: { key: "THIEN_DUC", name: "Thiên Đức", type: "cat", ngu_hanh: NguHanh.THO, sao_key: true },
    THIEN_HY:  { key: "THIEN_HY", name: "Thiên Hỷ", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: false },
    THIEN_MA:  { key: "THIEN_MA", name: "Thiên Mã", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: true },
    THIEN_KHOC:{ key: "THIEN_KHOC", name: "Thiên Khốc", type: "sat", ngu_hanh: NguHanh.THUY, sao_key: false },
    THIEN_HU:  { key: "THIEN_HU", name: "Thiên Hư", type: "sat", ngu_hanh: NguHanh.THUY, sao_key: false },
    DAO_HOA:   { key: "DAO_HOA", name: "Đào Hoa", type: "cat", ngu_hanh: NguHanh.MOC, sao_key: true }, 
    HONG_LOAN: { key: "HONG_LOAN", name: "Hồng Loan", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: true },
    HOA_CAI:   { key: "HOA_CAI", name: "Hoa Cái", type: "cat", ngu_hanh: NguHanh.KIM, sao_key: false },
    KIEP_SAT:  { key: "KIEP_SAT", name: "Kiếp Sát", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    PHA_TOAI:  { key: "PHA_TOAI", name: "Phá Toái", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    CO_THAN:   { key: "CO_THAN", name: "Cô Thần", type: "sat", ngu_hanh: NguHanh.THO, sao_key: true },
    QUA_TU:    { key: "QUA_TU", name: "Quả Tú", type: "sat", ngu_hanh: NguHanh.THO, sao_key: true },
  
    // Tháng sinh
    TA_PHU:    { key: "TA_PHU", name: "Tả Phù", type: "cat", ngu_hanh: NguHanh.THO, sao_key: true },
    HUU_BAT:   { key: "HUU_BAT", name: "Hữu Bật", type: "cat", ngu_hanh: NguHanh.THO, sao_key: true },
    THIEN_HINH:{ key: "THIEN_HINH", name: "Thiên Hình", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    THIEN_RIEU:{ key: "THIEN_RIEU", name: "Thiên Riêu", type: "sat", ngu_hanh: NguHanh.THUY, sao_key: false },
    THIEN_Y:   { key: "THIEN_Y", name: "Thiên Y", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: false },
    THIEN_GIAI:{ key: "THIEN_GIAI", name: "Thiên Giải", type: "cat", ngu_hanh: NguHanh.HOA, sao_key: false },
    DIA_GIAI:  { key: "DIA_GIAI", name: "Địa Giải", type: "cat", ngu_hanh: NguHanh.THO, sao_key: false },
  
    // Giờ sinh
    VAN_XUONG: { key: "VAN_XUONG", name: "Văn Xương", type: "cat", ngu_hanh: NguHanh.KIM, sao_key: true },
    VAN_KHUC:  { key: "VAN_KHUC", name: "Văn Khúc", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: true },
    DIA_KHONG: { key: "DIA_KHONG", name: "Địa Không", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: true },
    DIA_KIEP:  { key: "DIA_KIEP", name: "Địa Kiếp", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: true },
    THAI_PHU:  { key: "THAI_PHU", name: "Thai Phụ", type: "cat", ngu_hanh: NguHanh.KIM, sao_key: false },
    PHONG_CAO: { key: "PHONG_CAO", name: "Phong Cáo", type: "cat", ngu_hanh: NguHanh.THO, sao_key: false },
  
    // Hỏa Linh
    HOA_TINH:  { key: "HOA_TINH", name: "Hỏa Tinh", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: true },
    LINH_TINH: { key: "LINH_TINH", name: "Linh Tinh", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: true },

    // Khác
    THIEN_LA:  { key: "THIEN_LA", name: "Thiên La", type: "sat", ngu_hanh: NguHanh.KIM, sao_key: true },
    DIA_VONG:  { key: "DIA_VONG", name: "Địa Võng", type: "sat", ngu_hanh: NguHanh.KIM, sao_key: true },
    THIEN_SU:  { key: "THIEN_SU", name: "Thiên Sứ", type: "sat", ngu_hanh: NguHanh.THUY, sao_key: false },
    THIEN_TAI: { key: "THIEN_TAI", name: "Thiên Tài", type: "cat", ngu_hanh: NguHanh.THO, sao_key: false },
    THIEN_THO: { key: "THIEN_THO", name: "Thiên Thọ", type: "cat", ngu_hanh: NguHanh.THO, sao_key: false },
    AN_QUANG:  { key: "AN_QUANG", name: "Ân Quang", type: "cat", ngu_hanh: NguHanh.MOC, sao_key: true },
    THIEN_QUY: { key: "THIEN_QUY", name: "Thiên Quý", type: "cat", ngu_hanh: NguHanh.THO, sao_key: true },
    THIEN_KHONG: { key: "THIEN_KHONG", name: "Thiên Không", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    TAM_THAI: { key: "TAM_THAI", name: "Tam Thai", type: "cat", ngu_hanh: NguHanh.THUY, sao_key: true },
    BAT_TOA: { key: "BAT_TOA", name: "Bát Toạ", type: "cat", ngu_hanh: NguHanh.MOC, sao_key: true },
    DAU_QUAN: { key: "DAU_QUAN", name: "Đẩu Quân", type: "sat", ngu_hanh: NguHanh.HOA, sao_key: false },
    THIEN_THUONG: { key: "THIEN_THUONG", name: "Thiên Thương", type: "sat", ngu_hanh: NguHanh.THO, sao_key: false }

  };
  

export const DoSang = {
    MIEU: { symbol: "M", name: "Miếu" },
    VUONG: { symbol: "V", name: "Vượng" },
    DAC: { symbol: "Đ", name: "Đắc" },
    BINH: { symbol: "B", name: "Bình" },
    HAM: { symbol: "H", name: "Hãm" }    
}

export const LuuTinh = {
    L_THAI_TUE: {
        key: "L_THAI_TUE",
        original: PhuTinh.THAI_TUE
    },
    L_TANG_MON: {
        key: "L_TANG_MON",
        original: PhuTinh.TANG_MON
    },
    L_BACH_HO: {
        key: "L_BACH_HO",
        original: PhuTinh.BACH_HO
    },
    L_THIEN_KHOC: {
        key: "L_THIEN_KHOC",
        original: PhuTinh.THIEN_KHOC
    },
    L_THIEN_HU: {
        key: "L_THIEN_HU",
        original: PhuTinh.THIEN_HU
    },
    L_LOC_TON: {
        key: "L_LOC_TON",
        original: PhuTinh.LOC_TON
    },
    L_KINH_DUONG: {
        key: "L_KINH_DUONG",
        original: PhuTinh.KINH_DUONG
    },
    L_DA_LA: {
        key: "L_DA_LA",
        original: PhuTinh.DA_LA
    },
    L_THIEN_MA: {
        key: "L_THIEN_MA",
        original: PhuTinh.THIEN_MA
    },
    L_HOA_LOC: {
        key: "L_HOA_LOC",
        original: PhuTinh.HOA_LOC
    },
    L_HOA_QUYEN: {
        key: "L_HOA_QUYEN",
        original: PhuTinh.HOA_QUYEN
    },
    L_HOA_KHOA: {
        key: "L_HOA_KHOA",
        original: PhuTinh.HOA_KHOA
    },
    L_HOA_KY: {
        key: "L_HOA_KY",
        original: PhuTinh.HOA_KY
    },
    L_DAO_HOA: {
        key: "L_DAO_HOA",
        original: PhuTinh.DAO_HOA
    },
    L_HONG_LOAN: {
        key: "L_HONG_LOAN",
        original: PhuTinh.HONG_LOAN
    },
    L_KIEP_SAT: {
        key: "L_KIEP_SAT",
        original: PhuTinh.KIEP_SAT
    },
    L_VAN_XUONG: {
        key: "L_VAN_XUONG",
        original: PhuTinh.VAN_XUONG
    },
    L_VAN_KHUC: {
        key: "L_VAN_KHUC",
        original: PhuTinh.VAN_KHUC
    }
}
  