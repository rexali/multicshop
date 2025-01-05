function findDateDifference(date: Date) {
    if (date) {
        var diff = (new Date().getTime() - new Date(date)?.getTime()) / 1000;

        diff /= 60;
        
        var diff_min = Math.abs(Math.round(diff));

        if (diff_min < 1) {
            return diff_min + " secs ago"
        }

        if (diff_min > 1 && diff_min < 60) {
            return diff_min + " mins ago"
        }

        if (diff_min > 60 && diff_min < 1444) {
            return Math.round(diff_min / 60) + " hrs ago"
        }

        if (diff_min > 1444 && diff_min < 43200) {
            return Math.round(diff_min / 1444) + " days ago"
        }

        if (diff_min > 43200 && diff_min < 518400) {
            return Math.round(diff_min / 43200) + " months ago"
        }

        if (diff_min > 518400) {
            return Math.round(diff_min / 518400) + " yrs ago"
        }
    }
    return;
}

export {
    findDateDifference
}