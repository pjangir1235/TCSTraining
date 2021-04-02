export class Utility {
    
    public static getAgeInYears( DOB: Date ) {
        let newDate: Date;
        let year = 31557600000;
        let newDate2 = +new Date( DOB );

        let diff = Math.trunc(( Date.now() - newDate2 ) / year );

        console.log( newDate2 );
        console.log( diff );
        return diff;
    }
}
