import { 
    runPromptSuNghiep,
    runPromptTinhDuyen,
    runPromptToChat,
    runPromptLonLen
} from "../../utils/prompt_utils";
import { GioiTinh } from '../../constant/constant'
import { convertBirthToYin } from '../../utils/utils'

export async function POST(request) {
    const body = await request.json();

    const day = body.day;
    const month = body.month;
    const year = body.year;
    const hours = body.hours || "0";
    const minutes = body.minutes || "0";

    const genderRaw = body.gender || "NAM";
    const namHan = body.namHan || year;
    const type = body.type; // 👈 thêm type

    // Basic validation
    if (!day || !month || !year) {
        return Response.json(
            { error: 'Day, month, and year are required parameters' },
            { status: 400 }
        );
    }

    if (!type || !['sunghiep','tinhduyen','tochat','lonlen'].includes(type)) {
        return Response.json(
            { error: 'Invalid or missing type parameter' },
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

        // Gioi tinh
        const gender = GioiTinh[genderRaw] || GioiTinh.NAM;

        const yinBirthday = convertBirthToYin({
            year: year,
            month: month,
            day: day,
            hours: hours,
            minutes: minutes,
            gender: gender
        });

        const yinNamHan = convertBirthToYin({
            year: namHan,
            month: month,
            day: day,
        });

        // Chọn hàm dựa trên type
        let data;
        switch (type) {
            case 'sunghiep':
                data = await runPromptSuNghiep(yinBirthday, yinNamHan);
                break;
            case 'tinhduyen':
                data = await runPromptTinhDuyen(yinBirthday, yinNamHan);
                break;
            case 'tochat':
                data = await runPromptToChat(yinBirthday, yinNamHan);
                break;
            case 'lonlen':
                data = await runPromptLonLen(yinBirthday, yinNamHan);
                break;
        }

        // If response is wrapped in ```json ... ```
        if (typeof data === "string") {
            data = data
                .replace(/^```json\s*/, "")
                .replace(/^```/, "")
                .replace(/```$/, "")
                .trim();

            try {
                data = JSON.parse(data);
            } catch (err) {
                console.error("Failed to parse JSON:", err, data);
                return Response.json({ error: "Invalid JSON from model" }, { status: 500 });
            }
        }

        return Response.json(data);
    } catch (error) {
        console.log(error)
        return Response.json(
            { error: 'Invalid date parameters', details: error.message },
            { status: 400 }
        );
    }
}
