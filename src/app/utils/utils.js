import {
    ConGiap,
    Cung,
    ThienCan,
    Cuc,
    BanMenh,
    AmDuongNamNu,
    GioiTinh,
    ChinhTinh,
    VongTruongSinh,
    PhuTinh,
    DoSang,
    LuuTinh
} from "../constant/constant";

import solarlunar from 'solarlunar'


/*
    An co ban
*/
export function anCanChi(yinBirthDate) {
    const year = Number(yinBirthDate.year); // năm âm lịch

    // Map số -> Can
    const canKeys = ["CANH", "TAN", "NHAM", "QUY", "GIAP", "AT", "BINH", "DINH", "MAU", "KY"];
    const canKey = canKeys[year % 10];
    const can = ThienCan[canKey];

    // Map số -> Chi
    const chiKeys = ["THAN", "DAU", "TUAT", "HOI", "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE", "NGO", "MUI"];
    const chiKey = chiKeys[year % 12];
    const chi = ConGiap[chiKey];

    return { canKey, can, chiKey, chi };
}

export function anMenh(yinBirthDate) {
    const monthNum = Number(yinBirthDate.month);
    const hourNum = Number(yinBirthDate.hours);

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
    const hourNum = Number(yinBirthDate.hours); // 0..23

    // 1) From Dần count to lunar month -> monthPosition
    const monthPosition = mod((ConGiap.DAN.number - 1) + (monthNum - 1), 12) + 1;

    // 2) Determine the birth hour branch
    const hourBranch = getConGiapByHour(hourNum);

    // 3) Count forward (thuận) from monthPosition (treated as Tý=1) by (hourBranch.number - 1)
    const numOfThan = mod(monthPosition + (hourBranch.number - 1) - 1, 12) + 1;

    return getConGiapByNumber(numOfThan);
}

export function anCung(yinBirthDate) {
    // 1️⃣ Xác định cung Mệnh
    const menhBranch = anMenh(yinBirthDate); // ConGiap[...] object
    const menhNum = menhBranch.number;

    // 2️⃣ Thứ tự các cung (theo vòng 12 cung Tử Vi)
    const cungOrder = [
        "MENH",
        "PHU_MAU",
        "PHUC_DUC",
        "DIEN_TRACH",
        "QUAN_LOC",
        "NO_BOC",
        "THIEN_DI",
        "TAT_ACH",
        "TAI_BACH",
        "TU_TUC",
        "PHU_THE",
        "HUYNH_DE"
    ];

    // 3️⃣ Lập kết quả
    const result = {};
    cungOrder.forEach((cungKey, idx) => {
        // Đi thuận chiều (cộng thêm idx)
        const giapNum = mod((menhNum - 1) + idx, 12) + 1;
        result[cungKey] = getConGiapByNumber(giapNum);
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
    result[ChinhTinh.TU_VI.name] = {
        ...tuVi,
        doSang: getDoSangForStar("TU_VI", tuVi.key)
    };

    // An Thiên Phủ theo bảng ánh xạ
    const thienPhuKey = getThienPhuKey(tuVi.key);
    result[ChinhTinh.THIEN_PHU.name] = {
        ...ConGiap[thienPhuKey],
        doSang: getDoSangForStar("THIEN_PHU", thienPhuKey)
    };

    const CUNG_KIM_DONG_HO = [
        "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE",
        "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"
    ];

    function nextCung(startKey, step = 1, clockwise = true, skipKeys = []) {
        let idx = CUNG_KIM_DONG_HO.indexOf(startKey);
        while (step > 0) {
            idx = mod(idx + (clockwise ? 1 : -1), 12);
            if (!skipKeys.includes(CUNG_KIM_DONG_HO[idx])) step--;
        }
        return CUNG_KIM_DONG_HO[idx];
    }

    // 1️⃣ An các sao từ Tử Vi (ngược)
    let currentKey = tuVi.key;
    const saoTuViOrder = [
        { star: ChinhTinh.THIEN_CO, skip: 0 },
        { star: ChinhTinh.THAI_DUONG, skip: 1 },
        { star: ChinhTinh.VU_KHUC, skip: 0 },
        { star: ChinhTinh.THIEN_DONG, skip: 0 },
        { star: ChinhTinh.LIEM_TRINH, skip: 2 },
    ];

    saoTuViOrder.forEach(({ star, skip }) => {
        const cungKey = nextCung(currentKey, skip + 1, false);
        result[star.name] = {
            ...ConGiap[cungKey],
            doSang: getDoSangForStar(star.key, cungKey)
        };
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
        const cungKey = nextCung(currentKey, skip + 1, true);
        result[star.name] = {
            ...ConGiap[cungKey],
            doSang: getDoSangForStar(star.key, cungKey)
        };
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
        "TAU_THU", "PHI_LIEM", "HI_THAN", "BENH_PHU",
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
        "PHUC_DUC",
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
    const { canKey } = anCanChi(yinBirthDate);
    if (!canKey) return null;


    const chinhTinh = anChinhTinh(yinBirthDate) || {};
    const theoGio = anSaoTheoGioSinh(yinBirthDate) || {};
    const theoThang = anSaoTheoThangSinh(yinBirthDate) || {};

    const allStars = { ...chinhTinh, ...theoGio, ...theoThang };

    // 1) Tứ Hóa theo Thiên Can
    const tuHoaTable = {
        GIAP: { HOA_LOC: ChinhTinh.LIEM_TRINH, HOA_QUYEN: ChinhTinh.PHA_QUAN, HOA_KHOA: ChinhTinh.VU_KHUC, HOA_KY: ChinhTinh.THAI_DUONG },
        AT: { HOA_LOC: ChinhTinh.THIEN_CO, HOA_QUYEN: ChinhTinh.THIEN_LUONG, HOA_KHOA: ChinhTinh.TU_VI, HOA_KY: ChinhTinh.THAI_AM },
        BINH: { HOA_LOC: ChinhTinh.THIEN_DONG, HOA_QUYEN: ChinhTinh.THIEN_CO, HOA_KHOA: PhuTinh.VAN_XUONG, HOA_KY: ChinhTinh.LIEM_TRINH },
        DINH: { HOA_LOC: ChinhTinh.THAI_AM, HOA_QUYEN: ChinhTinh.THIEN_DONG, HOA_KHOA: ChinhTinh.THIEN_CO, HOA_KY: ChinhTinh.CU_MON },
        MAU: { HOA_LOC: ChinhTinh.THAM_LANG, HOA_QUYEN: ChinhTinh.THAI_AM, HOA_KHOA: ChinhTinh.THAI_DUONG, HOA_KY: ChinhTinh.THIEN_CO },
        KY: { HOA_LOC: ChinhTinh.VU_KHUC, HOA_QUYEN: ChinhTinh.THAM_LANG, HOA_KHOA: ChinhTinh.THIEN_LUONG, HOA_KY: PhuTinh.VAN_KHUC },
        CANH: { HOA_LOC: ChinhTinh.THAI_DUONG, HOA_QUYEN: ChinhTinh.VU_KHUC, HOA_KHOA: ChinhTinh.THIEN_DONG, HOA_KY: ChinhTinh.THIEN_TUONG },
        TAN: { HOA_LOC: ChinhTinh.CU_MON, HOA_QUYEN: ChinhTinh.THAI_DUONG, HOA_KHOA: PhuTinh.VAN_KHUC, HOA_KY: PhuTinh.VAN_XUONG },
        NHAM: { HOA_LOC: ChinhTinh.THIEN_LUONG, HOA_QUYEN: ChinhTinh.TU_VI, HOA_KHOA: PhuTinh.TA_PHU, HOA_KY: ChinhTinh.VU_KHUC },
        QUY: { HOA_LOC: ChinhTinh.PHA_QUAN, HOA_QUYEN: ChinhTinh.CU_MON, HOA_KHOA: ChinhTinh.THAI_AM, HOA_KY: ChinhTinh.THAM_LANG }
    };

    const tuHoa = tuHoaTable[canKey];
    if (tuHoa) {
        Object.entries(tuHoa).forEach(([hoaKey, targetStar]) => {
            const starDef = PhuTinh[hoaKey]; // ví dụ HOA_LOC
            const targetCung = allStars[targetStar.name];

            result[starDef.name] = {
                key: hoaKey,
                name: starDef.name,
                type: starDef.type,
                isTuHoa: true,
                target: { key: targetStar.key, name: targetStar.name },
                ...(targetCung ? { ...targetCung } : null)
            };
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

    // 3️⃣ Tuần Không
    // Bảng Tuần Không theo năm Giáp
    const tuanKhongTable = {
        GIAP_TY: ["TUAT", "HOI"],
        GIAP_DAN: ["TY", "SUU"],
        GIAP_THIN: ["MAO", "DAN"],
        GIAP_NGO: ["THIN", "TY_SNAKE"],
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

export function anSaoTheoDiaChi(yinBirthDate) {
    const result = {};
    const { chiKey } = anCanChi(yinBirthDate); // lấy Địa chi năm sinh
    if (!chiKey) return null;

    // Bảng tra theo địa chi tuổi (16 sao)
    const diaChiTable = {
        TY: {
            PHUONG_CAC: "TUAT", GIAI_THAN: "TUAT", LONG_TRI: "THIN", NGUYET_DUC: "TY_SNAKE", THIEN_DUC: "DAU",
            THIEN_HY: "DAU", THIEN_MA: "DAN", THIEN_KHOC: "NGO", THIEN_HU: "NGO", DAO_HOA: "DAU",
            HONG_LOAN: "MAO", HOA_CAI: "THIN", KIEP_SAT: "TY_SNAKE", PHA_TOAI: "TY_SNAKE", CO_THAN: "DAN", QUA_TU: "TUAT"
        },
        SUU: {
            PHUONG_CAC: "DAU", GIAI_THAN: "DAU", LONG_TRI: "TY_SNAKE", NGUYET_DUC: "NGO", THIEN_DUC: "TUAT",
            THIEN_HY: "THAN", THIEN_MA: "HOI", THIEN_KHOC: "TY_SNAKE", THIEN_HU: "MUI", DAO_HOA: "NGO",
            HONG_LOAN: "DAN", HOA_CAI: "SUU", KIEP_SAT: "DAN", PHA_TOAI: "SUU", CO_THAN: "DAN", QUA_TU: "TUAT"
        },
        DAN: {
            PHUONG_CAC: "THAN", GIAI_THAN: "THAN", LONG_TRI: "NGO", NGUYET_DUC: "MUI", THIEN_DUC: "HOI",
            THIEN_HY: "MUI", THIEN_MA: "THAN", THIEN_KHOC: "THIN", THIEN_HU: "THAN", DAO_HOA: "MAO",
            HONG_LOAN: "SUU", HOA_CAI: "TUAT", KIEP_SAT: "HOI", PHA_TOAI: "DAU", CO_THAN: "TY_SNAKE", QUA_TU: "SUU"
        },
        MAO: {
            PHUONG_CAC: "MUI", GIAI_THAN: "MUI", LONG_TRI: "MUI", NGUYET_DUC: "THAN", THIEN_DUC: "TY",
            THIEN_HY: "NGO", THIEN_MA: "TY_SNAKE", THIEN_KHOC: "MAO", THIEN_HU: "DAU", DAO_HOA: "TY",
            HONG_LOAN: "TY", HOA_CAI: "MUI", KIEP_SAT: "THAN", PHA_TOAI: "TY_SNAKE", CO_THAN: "TY_SNAKE", QUA_TU: "SUU"
        },
        THIN: {
            PHUONG_CAC: "NGO", GIAI_THAN: "NGO", LONG_TRI: "THAN", NGUYET_DUC: "DAU", THIEN_DUC: "SUU",
            THIEN_HY: "TY_SNAKE", THIEN_MA: "DAN", THIEN_KHOC: "DAN", THIEN_HU: "TUAT", DAO_HOA: "DAU",
            HONG_LOAN: "HOI", HOA_CAI: "THIN", KIEP_SAT: "TY_SNAKE", PHA_TOAI: "SUU", CO_THAN: "TY_SNAKE", QUA_TU: "SUU"
        },
        TY_SNAKE: {
            PHUONG_CAC: "TY_SNAKE", GIAI_THAN: "TY_SNAKE", LONG_TRI: "DAU", NGUYET_DUC: "TUAT", THIEN_DUC: "DAN",
            THIEN_HY: "THIN", THIEN_MA: "HOI", THIEN_KHOC: "SUU", THIEN_HU: "HOI", DAO_HOA: "NGO",
            HONG_LOAN: "TUAT", HOA_CAI: "SUU", KIEP_SAT: "DAN", PHA_TOAI: "DAU", CO_THAN: "THAN", QUA_TU: "THIN"
        },
        NGO: {
            PHUONG_CAC: "THIN", GIAI_THAN: "THIN", LONG_TRI: "TUAT", NGUYET_DUC: "HOI", THIEN_DUC: "MAO",
            THIEN_HY: "MAO", THIEN_MA: "THAN", THIEN_KHOC: "TY", THIEN_HU: "TY", DAO_HOA: "MAO",
            HONG_LOAN: "DAU", HOA_CAI: "TUAT", KIEP_SAT: "HOI", PHA_TOAI: "TY_SNAKE", CO_THAN: "THAN", QUA_TU: "THIN"
        },
        MUI: {
            PHUONG_CAC: "MAO", GIAI_THAN: "MAO", LONG_TRI: "HOI", NGUYET_DUC: "TY", THIEN_DUC: "THIN",
            THIEN_HY: "DAN", THIEN_MA: "TY_SNAKE", THIEN_KHOC: "HOI", THIEN_HU: "SUU", DAO_HOA: "TY",
            HONG_LOAN: "THAN", HOA_CAI: "MUI", KIEP_SAT: "THAN", PHA_TOAI: "SUU", CO_THAN: "THAN", QUA_TU: "THIN"
        },
        THAN: {
            PHUONG_CAC: "DAN", GIAI_THAN: "DAN", LONG_TRI: "TY", NGUYET_DUC: "SUU", THIEN_DUC: "TY_SNAKE",
            THIEN_HY: "SUU", THIEN_MA: "DAN", THIEN_KHOC: "TUAT", THIEN_HU: "DAN", DAO_HOA: "DAU",
            HONG_LOAN: "MUI", HOA_CAI: "THIN", KIEP_SAT: "TY_SNAKE", PHA_TOAI: "DAU", CO_THAN: "HOI", QUA_TU: "MUI"
        },
        DAU: {
            PHUONG_CAC: "SUU", GIAI_THAN: "SUU", LONG_TRI: "SUU", NGUYET_DUC: "DAN", THIEN_DUC: "NGO",
            THIEN_HY: "TY", THIEN_MA: "HOI", THIEN_KHOC: "DAU", THIEN_HU: "MAO", DAO_HOA: "NGO",
            HONG_LOAN: "NGO", HOA_CAI: "SUU", KIEP_SAT: "DAN", PHA_TOAI: "TY_SNAKE", CO_THAN: "HOI", QUA_TU: "MUI"
        },
        TUAT: {
            PHUONG_CAC: "TY", GIAI_THAN: "TY", LONG_TRI: "DAN", NGUYET_DUC: "MAO", THIEN_DUC: "MUI",
            THIEN_HY: "HOI", THIEN_MA: "THAN", THIEN_KHOC: "THAN", THIEN_HU: "THIN", DAO_HOA: "MAO",
            HONG_LOAN: "TY_SNAKE", HOA_CAI: "TUAT", KIEP_SAT: "HOI", PHA_TOAI: "SUU", CO_THAN: "HOI", QUA_TU: "MUI"
        },
        HOI: {
            PHUONG_CAC: "HOI", GIAI_THAN: "HOI", LONG_TRI: "MAO", NGUYET_DUC: "THIN", THIEN_DUC: "THAN",
            THIEN_HY: "TUAT", THIEN_MA: "TY_SNAKE", THIEN_KHOC: "MUI", THIEN_HU: "TY_SNAKE", DAO_HOA: "TY",
            HONG_LOAN: "THIN", HOA_CAI: "MUI", KIEP_SAT: "THAN", PHA_TOAI: "DAU", CO_THAN: "DAN", QUA_TU: "TUAT"
        }
    };

    const saoChi = diaChiTable[chiKey];
    if (saoChi) {
        Object.entries(saoChi).forEach(([key, cung]) => {
            result[PhuTinh[key].name] = ConGiap[cung];
        });
    }

    return result;
}

export function anSaoTheoThangSinh(yinBirthDate) {
    const result = {};
    const { month } = yinBirthDate; // giả sử yinBirthDate có field month = tháng âm lịch
    if (!month || month < 1 || month > 12) return null;

    const saoThangTable = {
        TA_PHU: ["THIN", "TY_SNAKE", "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI", "TY", "SUU", "DAN", "MAO"],
        HUU_BAT: ["TUAT", "DAU", "THAN", "MUI", "NGO", "TY_SNAKE", "THIN", "MAO", "DAN", "SUU", "TY", "HOI"],
        THIEN_HINH: ["DAU", "TUAT", "HOI", "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE", "NGO", "MUI", "THAN"],
        THIEN_RIEU: ["SUU", "DAN", "MAO", "THIN", "TY_SNAKE", "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI", "TY"],
        THIEN_Y: ["SUU", "DAN", "MAO", "THIN", "TY_SNAKE", "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI", "TY"],
        THIEN_GIAI: ["THAN", "DAU", "TUAT", "HOI", "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE", "NGO", "MUI"],
        DIA_GIAI: ["MUI", "THAN", "DAU", "TUAT", "HOI", "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE", "NGO"]
    };

    Object.entries(saoThangTable).forEach(([sao, arr]) => {
        const chi = arr[month - 1]; // tháng 1 -> index 0
        result[PhuTinh[sao].name] = ConGiap[chi];
    });

    return result;
}

export function anSaoTheoGioSinh(yinBirthDate) {
    const result = {};
    const { hours } = yinBirthDate;
    if (hours == null || hours < 0 || hours > 23) return null;

    // 1️⃣ Map giờ dương -> giờ âm (theo canh giờ 2 tiếng)
    const gioAmMap = [
        "TY",    // 23h–1h
        "SUU",   // 1h–3h
        "DAN",   // 3h–5hs
        "MAO",   // 5h–7h
        "THIN",  // 7h–9h
        "TY_SNAKE", // 9h–11h
        "NGO",   // 11h–13h
        "MUI",   // 13h–15h
        "THAN",  // 15h–17h
        "DAU",   // 17h–19h
        "TUAT",  // 19h–21h
        "HOI"    // 21h–23h
    ];

    // xác định giờ âm
    let gioIndex;
    if (hours >= 23 || hours < 1) gioIndex = 0;
    else if (hours < 3) gioIndex = 1;
    else if (hours < 5) gioIndex = 2;
    else if (hours < 7) gioIndex = 3;
    else if (hours < 9) gioIndex = 4;
    else if (hours < 11) gioIndex = 5;
    else if (hours < 13) gioIndex = 6;
    else if (hours < 15) gioIndex = 7;
    else if (hours < 17) gioIndex = 8;
    else if (hours < 19) gioIndex = 9;
    else if (hours < 21) gioIndex = 10;
    else gioIndex = 11;

    // 2️⃣ Bảng an sao theo giờ sinh
    const saoGioTable = {
        VAN_XUONG: ["TUAT", "DAU", "THAN", "MUI", "NGO", "TY_SNAKE", "THIN", "MAO", "DAN", "SUU", "TY", "HOI"],
        VAN_KHUC: ["THIN", "TY_SNAKE", "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI", "TY", "SUU", "DAN", "MAO"],
        DIA_KHONG: ["HOI", "TUAT", "DAU", "THAN", "MUI", "NGO", "TY_SNAKE", "THIN", "MAO", "DAN", "SUU", "TY"],
        DIA_KIEP: ["HOI", "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE", "NGO", "MUI", "THAN", "DAU", "TUAT"],
        THAI_PHU: ["NGO", "MUI", "THAN", "DAU", "TUAT", "HOI", "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE"],
        PHONG_CAO: ["DAN", "MAO", "THIN", "TY_SNAKE", "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI", "TY", "SUU"]
    };

    // 3️⃣ Gán sao
    Object.entries(saoGioTable).forEach(([sao, arr]) => {
        const chi = arr[gioIndex];
        result[PhuTinh[sao].name] = ConGiap[chi];
    });

    return result;
}

export function anSaoHoaLinh(yinBirthDate) {
    const result = {};
    const { year, hours, gender } = yinBirthDate;
    if (!year || hours == null) return null;

    // 1️⃣ Can Chi năm sinh
    const thienCan = year % 10;
    const diaChi = year % 12;

    const canList = ["CANH", "TAN", "NHAM", "QUY", "GIAP", "AT", "BINH", "DINH", "MAU", "KY"];
    const chiList = ["TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE", "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"];

    const can = canList[thienCan];
    const chi = chiList[diaChi];

    // 2️⃣ Giờ sinh (địa chi)
    const gioAmMap = [
        "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE",
        "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"
    ];
    let gioIndex;
    if (hours >= 23 || hours < 1) gioIndex = 0;
    else if (hours < 3) gioIndex = 1;
    else if (hours < 5) gioIndex = 2;
    else if (hours < 7) gioIndex = 3;
    else if (hours < 9) gioIndex = 4;
    else if (hours < 11) gioIndex = 5;
    else if (hours < 13) gioIndex = 6;
    else if (hours < 15) gioIndex = 7;
    else if (hours < 17) gioIndex = 8;
    else if (hours < 19) gioIndex = 9;
    else if (hours < 21) gioIndex = 10;
    else gioIndex = 11;

    // 3️⃣ Bảng khởi sao theo chi năm sinh
    const khoiTable = {
        "DAN": { HOA: "SUU", LINH: "MAO" },
        "NGO": { HOA: "SUU", LINH: "MAO" },
        "TUAT": { HOA: "SUU", LINH: "MAO" },
        "THAN": { HOA: "DAN", LINH: "TUAT" },
        "TY": { HOA: "DAN", LINH: "TUAT" },
        "THIN": { HOA: "DAN", LINH: "TUAT" },
        "TY_SNAKE": { HOA: "MAO", LINH: "TUAT" },
        "DAU": { HOA: "MAO", LINH: "TUAT" },
        "SUU": { HOA: "MAO", LINH: "TUAT" },
        "HOI": { HOA: "DAU", LINH: "TUAT" },
        "MAO": { HOA: "DAU", LINH: "TUAT" },
        "MUI": { HOA: "DAU", LINH: "TUAT" }
    };
    const khoi = khoiTable[chi];
    if (!khoi) return null;

    // 4️⃣ Âm/Dương can + giới tính
    const duongCan = ["GIAP", "BINH", "MAU", "CANH", "NHAM"];
    const isDuong = duongCan.includes(can);

    const isDuongNam = gender.name.toLowerCase() === "nam" && isDuong;
    const isAmNam = gender.name.toLowerCase() === "nam" && !isDuong;
    const isDuongNu = gender.name.toLowerCase() === "nữ" && isDuong;
    const isAmNu = gender.name.toLowerCase() === "nữ" && !isDuong;

    // 5️⃣ Hàm dịch chuyển
    function moveFrom(startChi, steps, direction) {
        const startIndex = chiList.indexOf(startChi);
        const n = chiList.length;
        if (startIndex === -1) return null;
        let idx;
        if (direction === "forward") {
            idx = (startIndex + steps) % n;
        } else {
            idx = (startIndex - steps + n) % n;
        }
        return chiList[idx];
    }

    // 6️⃣ Xác định vị trí sao
    let hoaChi, linhChi;
    if (isDuongNam || isAmNu) {
        // Hỏa thuận, Linh nghịch
        hoaChi = moveFrom(khoi.HOA, gioIndex, "forward");
        linhChi = moveFrom(khoi.LINH, gioIndex, "backward");
    } else if (isAmNam || isDuongNu) {
        // Hỏa nghịch, Linh thuận
        hoaChi = moveFrom(khoi.HOA, gioIndex, "backward");
        linhChi = moveFrom(khoi.LINH, gioIndex, "forward");
    }

    result[PhuTinh.HOA_TINH.name] = ConGiap[hoaChi];
    result[PhuTinh.LINH_TINH.name] = ConGiap[linhChi];
    return result;
}

export function anSaoThienTaiTho(yinBirthDate) {
    const result = {};
    const { year } = yinBirthDate;
    if (!year) return null;

    // 1️⃣ Lấy thông tin 12 cung (theo năm sinh)
    const cungMap = anCung(yinBirthDate);   // object MENH, PHU_MAU, ..., each is ConGiap
    const thanCung = anThan(yinBirthDate);  // ConGiap object của Thân

    // 2️⃣ Lấy địa chi của năm sinh
    const chiIndex = (year - 4) % 12; // 0 = Tý (năm 4 = Giáp Tý), 1 = Sửu, ...
    const chiList = [
        "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE",
        "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"
    ];
    const namChi = chiList[chiIndex];

    // 3️⃣ Hàm chạy thuận (MENH/THAN coi như Tý)
    function moveFromBase(baseCung, targetChi) {
        const baseNum = baseCung.number;              // số 1..12 của cung base
        const targetNum = getConGiapByKey(targetChi).number; // số 1..12 theo chi
        // tính khoảng cách thuận
        const steps = (targetNum - 1); // vì base coi là Tý = 1
        const finalNum = mod((baseNum - 1) + steps, 12) + 1;
        return getConGiapByNumber(finalNum);
    }

    // 4️⃣ An Thiên Tài (từ Mệnh)
    const menhCung = cungMap.MENH;
    result["Thiên Tài"] = moveFromBase(menhCung, namChi);

    // 5️⃣ An Thiên Thọ (từ Thân)
    result["Thiên Thọ"] = moveFromBase(thanCung, namChi);

    return result;
}

export function anSaoQuangQuy(yinBirthDate) {
    const result = {};
    const { day, hours } = yinBirthDate;

    if (!day || hours == null) return null;

    // =======================
    // 12 Địa Chi (must match ConGiap keys!)
    // =======================
    const chiList = [
        "TY",        // Tý
        "SUU",       // Sửu
        "DAN",       // Dần
        "MAO",       // Mão
        "THIN",      // Thìn
        "TY_SNAKE",  // Tỵ
        "NGO",       // Ngọ
        "MUI",       // Mùi
        "THAN",      // Thân
        "DAU",       // Dậu
        "TUAT",      // Tuất
        "HOI"        // Hợi
    ];

    // =======================
    // Đổi giờ sinh về chi
    // =======================
    function getHourChi(hours) {
        if (hours >= 23 || hours < 1) return "TY";
        if (hours < 3) return "SUU";
        if (hours < 5) return "DAN";
        if (hours < 7) return "MAO";
        if (hours < 9) return "THIN";
        if (hours < 11) return "TY_SNAKE";
        if (hours < 13) return "NGO";
        if (hours < 15) return "MUI";
        if (hours < 17) return "THAN";
        if (hours < 19) return "DAU";
        if (hours < 21) return "TUAT";
        return "HOI";
    }

    const gioChi = getHourChi(hours);
    const gioIndex = chiList.indexOf(gioChi);
    if (gioIndex === -1) {
        console.error("Invalid gioChi:", gioChi);
        return null;
    }

    // ====================
    // ⭐ An Ân Quang
    // ====================
    // B1: Tuất = giờ Tý → chạy ngược tới giờ sinh
    const posNgay1_AQ = moveFrom("TUAT", gioIndex, "backward");

    // B2: từ ngày1 chạy thuận tới ngày sinh
    const posNgayX_AQ = moveFrom(posNgay1_AQ, (day - 1), "forward");

    // B3: lùi 1 ô
    const final_AQ = moveFrom(posNgayX_AQ, 1, "backward");
    if (final_AQ) {
        result[PhuTinh.AN_QUANG.name] = ConGiap[final_AQ];
    }

    // ====================
    // ⭐ An Thiên Quý
    // ====================
    // B1: Thìn = giờ Tý → chạy thuận tới giờ sinh
    const posNgay1_TQ = moveFrom("THIN", gioIndex, "forward");

    // B2: từ ngày1 chạy ngược tới ngày sinh
    const posNgayX_TQ = moveFrom(posNgay1_TQ, (day - 1), "backward");

    // B3: tiến 1 ô
    const final_TQ = moveFrom(posNgayX_TQ, 1, "forward");

    if (final_TQ) {
        result[PhuTinh.THIEN_QUY.name] = ConGiap[final_TQ];
    }

    return result;
}

export function anSaoTamThaiBatToa(yinBirthDate) {
    const result = {};
    const { month, day } = yinBirthDate;
    if (!month || !day) return null;

    // ======================
    // ⭐ An Tam Thai
    // ======================
    // B1: Thìn = Tháng 1 → chạy thuận tới tháng sinh
    const posNgay1_TT = moveFrom("THIN", month - 1, "forward");

    // B2: từ đó đặt = Ngày 1, chạy thuận tiếp tới ngày sinh
    const final_TT = moveFrom(posNgay1_TT, day - 1, "forward");

    result[PhuTinh.TAM_THAI.name] = {
        ...ConGiap[final_TT]
    };

    // ======================
    // ⭐ An Bat Toa
    // ======================
    // B1: Tuất = Tháng 1 → chạy nghịch tới tháng sinh
    const posNgay1_BT = moveFrom("TUAT", month - 1, "backward");

    // B2: từ đó đặt = Ngày 1, chạy nghịch tiếp tới ngày sinh
    const final_BT = moveFrom(posNgay1_BT, day - 1, "backward");

    result[PhuTinh.BAT_TOA.name] = {
        ...ConGiap[final_BT]
    };

    return result;
}

export function anSaoKhac(yinBirthDate) {
    const result = {};

    // 1) Thiên La tại Thìn, Địa Võng tại Tuất (cố định)
    result[PhuTinh.THIEN_LA.name] = { ...ConGiap["THIN"] };
    result[PhuTinh.DIA_VONG.name] = { ...ConGiap["TUAT"] };

    // 2) Lấy bản đồ các cung (để đặt Thiên Sứ)
    const cungMap = anCung(yinBirthDate);
    if (!cungMap) return null;

    // 3) Thiên Sứ luôn ở cung Tật Ách
    if (cungMap["TAT_ACH"]) {
        result[PhuTinh.THIEN_SU.name] = { ...cungMap["TAT_ACH"] };
    }

    // Thiên Thương luôn ở cung Nô Bộc
    if (cungMap["NO_BOC"]) {
        result[PhuTinh.THIEN_THUONG.name] = { ...cungMap["NO_BOC"] };
    }

    // 4) Lấy vòng Thái Tuế để đặt Thiên Không (đặt cùng Thiếu Dương)
    const thaiTueMap = anSaoVongThaiTue(yinBirthDate) || {};
    const thieuDuongCung = thaiTueMap[PhuTinh.THIEU_DUONG.name];
    if (thieuDuongCung) {
        result[PhuTinh.THIEN_KHONG.name] = { ...thieuDuongCung };
    }

    // 5) An Đẩu Quân
    const thaiTueCung = thaiTueMap[PhuTinh.THAI_TUE.name];
    if (thaiTueCung) {
        const thaiTueKey = thaiTueCung.key; // ví dụ "MUI", "TY", ...
        const monthNum = Number(yinBirthDate.month); // tháng âm 1..12
        const hours = Number(yinBirthDate.hours);

        // validate month/hour
        if (!Number.isNaN(monthNum) && monthNum >= 1 && monthNum <= 12 && !Number.isNaN(hours)) {
            // 5.1: từ Thái Tuế lùi (backward) (monthNum - 1) để lấy vị trí 'tháng' (vị trí được coi là Tý)
            const posMonthKey = moveFrom(thaiTueKey, monthNum - 1, "backward"); // phải trả về một chuỗi chi

            if (posMonthKey) {
                // 5.2: tìm địa chi giờ sinh (key string) — dùng getConGiapByHour nếu có
                const hourBranch = getConGiapByHour(hours); // trả về ConGiap object
                const birthHourKey = hourBranch?.key;
                if (birthHourKey) {
                    // chuẩn thứ tự 12 địa chi theo kim đồng hồ
                    const CHI_ORDER = ["TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE", "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"];

                    // bước cần đi từ Tý -> giờ sinh theo chiều thuận
                    const stepsFromTyToHour = (CHI_ORDER.indexOf(birthHourKey) - CHI_ORDER.indexOf("TY") + 12) % 12;

                    // 5.3: từ posMonthKey (được coi là Tý) chạy thuận stepsFromTyToHour
                    const finalKey = moveFrom(posMonthKey, stepsFromTyToHour, "forward");

                    if (finalKey && ConGiap[finalKey]) {
                        result[PhuTinh.DAU_QUAN.name] = { ...ConGiap[finalKey] };
                    }
                }
            }
        }
    }

    return result;
}

export function anSaoLuuNien(yinNamHan) {
    const year = Number(yinNamHan?.year);
    if (!year || !Number.isFinite(year)) return null;
  
    // Vòng 12 chi theo đúng key trong ConGiap
    const chiRing = [
      "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE",
      "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"
    ];
    const norm = (n) => ((n % 12) + 12) % 12;
    const moveKey = (startKey, steps, clockwise = true) => {
      const i = chiRing.indexOf(startKey);
      if (i === -1) return null;
      return chiRing[norm(i + (clockwise ? steps : -steps))];
    };
  
    // 1) Lưu Thái Tuế
    const chiKey = getChiFromYear(year); // e.g. "TY_SNAKE"
    const res = {};
    res[LuuTinh.L_THAI_TUE.key] = { ...ConGiap[chiKey] };
  
    // 2) Lưu Tang Môn
    const tangMonKey = moveKey(chiKey, 2, true);
    if (tangMonKey) {
      res[LuuTinh.L_TANG_MON.key] = { ...ConGiap[tangMonKey] };
    }
  
    // 3) Lưu Bạch Hổ
    const bachHoKey = tangMonKey ? moveKey(tangMonKey, 6, true) : null;
    if (bachHoKey) {
      res[LuuTinh.L_BACH_HO.key] = { ...ConGiap[bachHoKey] };
    }
  
    // 4) Lưu Thiên Khốc / Hư
    const khocCung = getThienKhocCung(chiKey);
    if (khocCung) {
      res[LuuTinh.L_THIEN_KHOC.key] = { ...khocCung };
    }
    const huCung = getThienHuCung(chiKey);
    if (huCung) {
      res[LuuTinh.L_THIEN_HU.key] = { ...huCung };
    }
  
    // 5) Lưu Lộc Tồn theo Thiên Can
    const canKey = getCanFromYear(year);
    const locTonMap = {
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
    const locTonKey = locTonMap[canKey];
    if (locTonKey) {
      res[LuuTinh.L_LOC_TON.key] = { ...ConGiap[locTonKey] };
      const kinhDuongKey = moveKey(locTonKey, 1, false); // nghịch
      const daLaKey = moveKey(locTonKey, 1, true);      // thuận
      if (kinhDuongKey) {
        res[LuuTinh.L_KINH_DUONG.key] = { ...ConGiap[kinhDuongKey] };
      }
      if (daLaKey) {
        res[LuuTinh.L_DA_LA.key] = { ...ConGiap[daLaKey] };
      }
    }
  
    // 6) Lưu Thiên Mã
    const thienMaCung = getLuuThienMaFromChi(chiKey);
    if (thienMaCung) {
      res[LuuTinh.L_THIEN_MA.key] = { ...thienMaCung };
    }
  
    // 7) Lưu Đào Hoa (tam hợp tuổi năm hạn)
    const daoHoaMap = {
      "THAN": "DAU", "TY": "DAU", "THIN": "DAU",
      "TY_SNAKE": "NGO", "DAU": "NGO", "SUU": "NGO",
      "DAN": "MAO", "NGO": "MAO", "TUAT": "MAO",
      "HOI": "TY", "MAO": "TY", "MUI": "TY"
    };
    const daoHoaKey = daoHoaMap[chiKey];
    if (daoHoaKey) {
      res[LuuTinh.L_DAO_HOA.key] = { ...ConGiap[daoHoaKey] };
    }
  
    // 8) Lưu Hồng Loan (Mão = Tý, đếm nghịch đến chi năm hạn)
    const chiIndex = chiRing.indexOf(chiKey); // Tý=0,...,Hợi=11
    if (chiIndex !== -1) {
      // Bắt đầu từ Mão, lùi (đếm nghịch) chiIndex bước
      const hongLoanKey = moveKey("MAO", chiIndex, false);
      if (hongLoanKey) {
        res[LuuTinh.L_HONG_LOAN.key] = { ...ConGiap[hongLoanKey] };
      }
    }
  
    return res;
}
  

export function anSaoLuuTuHoa(yinBirthDate, yinNamHan) {
    const year = Number(yinNamHan?.year);
    if (!year || !Number.isFinite(year)) return null;
  
    // lấy thiên can năm hạn
    const canKey = getCanFromYear(year); // ví dụ: "GIAP", "AT", ...
    const tuHoaTable = {
        GIAP: { HOA_LOC: ChinhTinh.LIEM_TRINH, HOA_QUYEN: ChinhTinh.PHA_QUAN, HOA_KHOA: ChinhTinh.VU_KHUC, HOA_KY: ChinhTinh.THAI_DUONG },
        AT: { HOA_LOC: ChinhTinh.THIEN_CO, HOA_QUYEN: ChinhTinh.THIEN_LUONG, HOA_KHOA: ChinhTinh.TU_VI, HOA_KY: ChinhTinh.THAI_AM },
        BINH: { HOA_LOC: ChinhTinh.THIEN_DONG, HOA_QUYEN: ChinhTinh.THIEN_CO, HOA_KHOA: PhuTinh.VAN_XUONG, HOA_KY: ChinhTinh.LIEM_TRINH },
        DINH: { HOA_LOC: ChinhTinh.THAI_AM, HOA_QUYEN: ChinhTinh.THIEN_DONG, HOA_KHOA: ChinhTinh.THIEN_CO, HOA_KY: ChinhTinh.CU_MON },
        MAU: { HOA_LOC: ChinhTinh.THAM_LANG, HOA_QUYEN: ChinhTinh.THAI_AM, HOA_KHOA: ChinhTinh.THAI_DUONG, HOA_KY: ChinhTinh.THIEN_CO },
        KY: { HOA_LOC: ChinhTinh.VU_KHUC, HOA_QUYEN: ChinhTinh.THAM_LANG, HOA_KHOA: ChinhTinh.THIEN_LUONG, HOA_KY: PhuTinh.VAN_KHUC },
        CANH: { HOA_LOC: ChinhTinh.THAI_DUONG, HOA_QUYEN: ChinhTinh.VU_KHUC, HOA_KHOA: ChinhTinh.THIEN_DONG, HOA_KY: ChinhTinh.THIEN_TUONG },
        TAN: { HOA_LOC: ChinhTinh.CU_MON, HOA_QUYEN: ChinhTinh.THAI_DUONG, HOA_KHOA: PhuTinh.VAN_KHUC, HOA_KY: PhuTinh.VAN_XUONG },
        NHAM: { HOA_LOC: ChinhTinh.THIEN_LUONG, HOA_QUYEN: ChinhTinh.TU_VI, HOA_KHOA: PhuTinh.TA_PHU, HOA_KY: ChinhTinh.VU_KHUC },
        QUY: { HOA_LOC: ChinhTinh.PHA_QUAN, HOA_QUYEN: ChinhTinh.CU_MON, HOA_KHOA: ChinhTinh.THAI_AM, HOA_KY: ChinhTinh.THAM_LANG }
    };
    const hoaConfig = tuHoaTable[canKey];
    if (!hoaConfig) return null;
  
    const result = {};

    const chinhTinhMap = anChinhTinh(yinBirthDate);
    if (!chinhTinhMap) return null;

    Object.entries(hoaConfig).forEach(([hoaType, star]) => {
        const starPosition = chinhTinhMap[star.name]; // vị trí chính tinh bị Hóa
        if (!starPosition) return; // nếu chưa tìm thấy thì bỏ qua
    
        result[`L_${hoaType}`] = {
          ...starPosition,
          hoa: hoaType, // HOA_LOC -> HÓA LỘC
          star: star                       // Liêm Trinh, Phá Quân...
        };
      });
    
      return result;
  }

/*
    Lap la so
*/
export function lapLaSo(yinBirthDate) {
    // 1️⃣ Thông tin Mệnh bàn
    const menh = anMenh(yinBirthDate);
    const cuc = anCuc(yinBirthDate);
    const banMenh = anBanMenh(yinBirthDate);
    const amDuongNamNu = anAmDuongNamNu(yinBirthDate);
    const menhBan = { menh, cuc, banMenh, amDuongNamNu };

    // 2️⃣ Cung -> con giáp
    const cungMap = anCung(yinBirthDate);

    // 3️⃣ Đại vận
    const daiVanList = anDaiVan(yinBirthDate);

    // 4️⃣ Sao
    const chinhTinhMap = anChinhTinh(yinBirthDate) || {};
    const vongTruongSinhMap = anVongTruongSinh(yinBirthDate) || {};
    const phuTinhMap = {
        ...anSaoVongLocTon(yinBirthDate),
        ...anSaoVongThaiTue(yinBirthDate),
        ...anSaoTheoThienCan(yinBirthDate),
        ...anSaoTheoDiaChi(yinBirthDate),
        ...anSaoTheoThangSinh(yinBirthDate),
        ...anSaoTheoGioSinh(yinBirthDate),
        ...anSaoHoaLinh(yinBirthDate),
    };

    // 5️⃣ Gom thông tin từng cung
    const cungResult = {};
    Object.keys(cungMap).forEach(cungKey => {
        const chi = cungMap[cungKey];
        const cung = Cung[cungKey];

        const chinhTinhTrongCung = [];
        const phuTinhTrongCung = [];
        const truongSinhTrongCung = [];
        const tuHoaTrongCung = [];

        function collectSao(saoMap, targetArr) {
            Object.entries(saoMap).forEach(([saoKey, val]) => {
                if (Array.isArray(val)) {
                    if (val.find(v => v.key === chi.key)) {
                        targetArr.push(saoKey);
                    }
                } else if (val?.key === chi.key) {
                    targetArr.push(saoKey);
                }
            });
        }

        // phân loại
        collectSao(chinhTinhMap, chinhTinhTrongCung);
        collectSao(phuTinhMap, phuTinhTrongCung);
        collectSao(vongTruongSinhMap, truongSinhTrongCung);

        // 5.1️⃣ Chính tinh -> list + độ sáng
        const chinhTinhExpanded = chinhTinhTrongCung.map(saoName => {
            const foundKey = Object.keys(ChinhTinh).find(k => ChinhTinh[k].name === saoName);
            if (foundKey) {
                return {
                    key: foundKey,
                    ...ChinhTinh[foundKey],
                    doSang: getDoSangForStar(foundKey, chi.key)
                };
            }
            return { key: saoName, name: saoName, doSang: null };
        });

        // 5.2️⃣ Phụ tinh (bao gồm cả Tứ Hóa từ constant PhuTinh)
        const phuTinhExpanded = phuTinhTrongCung.map(saoName => {
            const foundKey = Object.keys(PhuTinh).find(k => PhuTinh[k].name === saoName);
            return foundKey ? { key: foundKey, ...PhuTinh[foundKey] } : { key: saoName, name: saoName };
        });

        // 5.3️⃣ Cat tinh & Sat tinh (lọc từ phuTinhExpanded)
        const catTinh = phuTinhExpanded.filter(s => s.type === "cat");
        const satTinh = phuTinhExpanded.filter(s => s.type === "sat");

        // 5.4️⃣ Vòng Trường Sinh
        const truongSinhExpanded = truongSinhTrongCung.map(saoName => {
            const foundKey = Object.keys(VongTruongSinh).find(k => VongTruongSinh[k].name === saoName);
            return foundKey ? { key: foundKey, ...VongTruongSinh[foundKey] } : { key: saoName, name: saoName };
        });

        // 5.5️⃣ Tứ Hóa -> list riêng (nhưng lấy từ PhuTinh constant)
        ["HOA_LOC", "HOA_QUYEN", "HOA_KHOA", "HOA_KY"].forEach(key => {
            if (phuTinhTrongCung.includes(PhuTinh[key].name)) {
                tuHoaTrongCung.push({ key, ...PhuTinh[key] });
            }
        });

        // Đại vận ứng với cung này
        const daiVan = daiVanList.find(dv => dv.chi.key === chi.key);

        cungResult[cungKey] = {
            cung: cung.name,
            chi: chi.name,
            chinhTinh: chinhTinhExpanded,
            phuTinh: phuTinhExpanded,   // ⭐ đã bao gồm Tứ Hóa từ constant
            catTinh,
            satTinh,
            vongTruongSinh: truongSinhExpanded,
            tuHoa: tuHoaTrongCung,      // ⭐ list riêng Tứ Hóa
            daiVan: daiVan || null
        };
    });

    return { menhBan, cung: cungResult };
}


/*
    Utils function
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

export function getConGiapByKey(key) {
    return ConGiap[key] || null;
}

function getThienPhuKey(tuViKey) {
    return ThienPhuMap[tuViKey] || null;
}

// Hàm trả về độ sáng (Miếu/Vượng/Đắc/Hãm) cho sao
function getDoSangForStar(starKey, cungKey) {
    // Bảng độ sáng của các sao chính tinh
    const DoSangMap = {
        THAI_DUONG: {
            MIEU: [],
            VUONG: ["DAN", "NGO", "THIN"],
            DAC: ["MAO", "TY_SNAKE", "SUU", "MUI"],
            BINH: [],
            HAM: ["THAN", "DAU", "TUAT", "HOI", "TY"]
        },
        TU_VI: {
            MIEU: ["NGO", "DAN", "THAN"],
            VUONG: ["THIN", "TUAT"],
            DAC: ["SUU", "MUI"],
            BINH: ["HOI", "TY", "MAO", "DAU"],
            HAM: []
        },
        LIEM_TRINH: {
            MIEU: ["THIN", "TUAT"],
            VUONG: ["TY", "NGO", "DAN", "THAN"],
            DAC: ["SUU", "MUI"],
            BINH: [],
            HAM: ["TY_SNAKE", "HOI", "MAO", "DAU"]
        },
        THIEN_DONG: {
            MIEU: ["DAN", "THAN"],
            VUONG: ["TY"],
            DAC: ["MAO", "TY_SNAKE", "HOI"],
            BINH: [],
            HAM: ["THIN", "TUAT", "SUU", "MUI", "NGO", "DAU"]
        },
        VU_KHUC: {
            MIEU: ["THIN", "TUAT", "SUU", "MUI"],
            VUONG: ["DAN", "THAN", "TY", "NGO"],
            DAC: ["TY", "HOI"],
            BINH: [],
            HAM: ["MAO", "DAU"]
        },
        THIEN_CO: {
            MIEU: ["THIN", "TUAT", "MAO", "DAU"],
            VUONG: ["TY_SNAKE", "THAN"],
            DAC: ["TY", "NGO", "SUU", "MUI"],
            BINH: [],
            HAM: ["DAN", "HOI"]
        },
        THIEN_PHU: {
            MIEU: ["DAN", "THAN", "TY", "NGO"],
            VUONG: ["THIN", "TUAT"],
            DAC: ["TY_SNAKE", "SUU", "MUI"],
            BINH: [],
            BINH: ["MAO", "DAU", "SUU"]
        },
        THAI_AM: {
            MIEU: ["DAU", "TUAT", "HOI"],
            VUONG: ["THAN", "TY"],
            DAC: ["SUU", "MUI"],
            BINH: [],
            HAM: ["DAN", "MAO", "THIN", "TY", "NGO"]
        },
        THAM_LANG: {
            MIEU: ["SUU", "MUI"],
            VUONG: ["THIN", "TUAT"],
            DAC: ["DAN", "THAN"],
            BINH: [],
            HAM: ["TY", "HOI", "TY_SNAKE", "NGO", "MAO", "DAU"]
        },
        CU_MON: {
            MIEU: ["MAO", "DAU"],
            VUONG: ["TY", "NGO", "DAN"],
            DAC: ["THAN", "HOI"],
            BINH: [],
            HAM: ["THIN", "TUAT", "SUU", "MUI", "TY_SNAKE"]
        },
        THIEN_TUONG: {
            MIEU: ["DAN", "THAN"],
            VUONG: ["THIN", "TUAT", "TY", "NGO"],
            DAC: ["SUU", "MUI", "TY_SNAKE", "HOI"],
            BINH: [],
            HAM: ["MAO", "DAU"]
        },
        THAT_SAT: {
            MIEU: ["DAN", "THAN", "TY", "NGO"],
            VUONG: ["TY_SNAKE", "HOI"],
            DAC: ["SUU", "MUI"],
            BINH: [],
            HAM: ["THIN", "TUAT", "MAO", "DAU"]
        },
        PHA_QUAN: {
            MIEU: ["TY", "NGO"],
            VUONG: ["SUU", "MUI"],
            DAC: ["THIN", "TUAT"],
            BINH: [],
            HAM: ["MAO", "DAU", "DAN", "THAN", "TY_SNAKE", "HOI"]
        }
    };

    const mapping = DoSangMap[starKey];
    if (!mapping) return DoSang.HAM; // nếu chưa định nghĩa thì coi là Hãm

    if (mapping.MIEU.includes(cungKey)) return DoSang.MIEU;
    if (mapping.VUONG.includes(cungKey)) return DoSang.VUONG;
    if (mapping.DAC.includes(cungKey)) return DoSang.DAC;
    if (mapping.BINH.includes(cungKey)) return DoSang.BINH;
    if (mapping.HAM.includes(cungKey)) return DoSang.HAM;

    return DoSang.HAM;
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

function moveFrom(startChi, steps, direction) {
    const chiList = [
        "TY", "SUU", "DAN", "MAO", "THIN", "TY_SNAKE",
        "NGO", "MUI", "THAN", "DAU", "TUAT", "HOI"
    ];

    const startIndex = chiList.indexOf(startChi);
    if (startIndex === -1) {
        console.error("Invalid startChi:", startChi);
        return null;
    }

    const n = chiList.length;
    let idx;

    if (direction === "forward") {
        idx = (startIndex + steps) % n;
    } else {
        idx = ((startIndex - steps) % n + n) % n;  // 🔥 fix here
    }

    return chiList[idx];
}  

// Can list: Giáp Ất Bính Đinh Mậu Kỷ Canh Tân Nhâm Quý
function getCanFromYear(year) {
    const canKeys = [
      "GIAP", "AT", "BINH", "DINH", "MAU",
      "KY", "CANH", "TAN", "NHAM", "QUY"
    ];
    return canKeys[(year - 4) % 10];
}
  
// Chi list: Tý Sửu Dần Mão Thìn Tỵ Ngọ Mùi Thân Dậu Tuất Hợi
function getChiFromYear(year) {
    const chiKeys = [
      "TY",       // Tý
      "SUU",      // Sửu
      "DAN",      // Dần
      "MAO",      // Mão
      "THIN",     // Thìn
      "TY_SNAKE", // Tỵ
      "NGO",      // Ngọ
      "MUI",      // Mùi
      "THAN",     // Thân
      "DAU",      // Dậu
      "TUAT",     // Tuất
      "HOI"       // Hợi
    ];
    return chiKeys[(year - 4) % 12];
}
  
// Lộc Tồn theo Can
function getLuuLocTonFromCan(can) {
  const map = {
    GIÁP: "DẦN", ẤT: "MÃO", BÍNH: "TỴ", ĐINH: "NGỌ", MẬU: "TỴ",
    KỶ: "NGỌ", CANH: "THÂN", TÂN: "DẬU", NHÂM: "HỢI", QUÝ: "TÝ"
  };
  const cung = ConGiap[map[can]];
  return cung || null;
}

// Lưu Thiên Khốc: Ngọ = Tý, đếm nghịch
function getThienKhocCung(chiNamHan) {
    const chiKeys = [
        "TY",       // Tý
        "SUU",      // Sửu
        "DAN",      // Dần
        "MAO",      // Mão
        "THIN",     // Thìn
        "TY_SNAKE", // Tỵ
        "NGO",      // Ngọ
        "MUI",      // Mùi
        "THAN",     // Thân
        "DAU",      // Dậu
        "TUAT",     // Tuất
        "HOI"       // Hợi
      ];
    const posNgo = chiKeys.indexOf("NGO");
    const posChi = chiKeys.indexOf(chiNamHan);
    // từ Ngọ = Tý, đếm nghịch đến chiNamHan
    const offset = (posNgo - posChi + 12) % 12;
    return ConGiap[chiKeys[offset]];
}

// Lưu Thiên Hư: Ngọ = Tý, đếm thuận
function getThienHuCung(chiNamHan) {
    const chiKeys = [
        "TY",       // Tý
        "SUU",      // Sửu
        "DAN",      // Dần
        "MAO",      // Mão
        "THIN",     // Thìn
        "TY_SNAKE", // Tỵ
        "NGO",      // Ngọ
        "MUI",      // Mùi
        "THAN",     // Thân
        "DAU",      // Dậu
        "TUAT",     // Tuất
        "HOI"       // Hợi
      ];
    const posNgo = chiKeys.indexOf("NGO");
    const posChi = chiKeys.indexOf(chiNamHan);
    const offset = (posChi - posNgo + 12) % 12;
    return ConGiap[chiKeys[offset]];
}

// Lưu Thiên Mã: theo nhóm tam hợp
function getLuuThienMaFromChi(chiNamHan) {
    const groups = {
        // nhóm Hợi
        TY_SNAKE: "HOI", 
        DAU: "HOI", 
        SUU: "HOI",
        
        // nhóm Tỵ
        HOI: "TY_SNAKE", 
        MAO: "TY_SNAKE", 
        MUI: "TY_SNAKE",
        
        // nhóm Thân
        DAN: "THAN", 
        NGO: "THAN", 
        TUAT: "THAN",
        
        // nhóm Dần
        THAN: "DAN", 
        TY: "DAN", 
        THIN: "DAN",
        };
    const cung = ConGiap[groups[chiNamHan]];
    return cung || null;
}
