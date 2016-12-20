﻿using System;
using System.Collections.Generic;
using System.Collections.Immutable;

namespace SmarterBalanced.SampleItems.Dal.Providers.Models
{
    [Flags]
    public enum GradeLevels
    {
        NA = 0,
        Grade3 = 1 << 0,
        Grade4 = 1 << 1,
        Grade5 = 1 << 2,
        Grade6 = 1 << 3,
        Grade7 = 1 << 4,
        Grade8 = 1 << 5,
        Grade9 = 1 << 6,
        Grade10 = 1 << 7,
        Grade11 = 1 << 8,
        Grade12 = 1 << 9,
        Elementary = Grade3 | Grade4 | Grade5,
        Middle = Grade6 | Grade7 | Grade8,
        High = Grade9 | Grade10 | Grade11 | Grade12,
        All = Elementary | Middle | High
    }

    public static class GradeLevelsUtils
    {
        public static GradeLevels FromString(string s)
        {
            switch (s)
            {
                case "03": 
                case "3":
                    return GradeLevels.Grade3;
                case "04": 
                case "4":
                    return GradeLevels.Grade4;
                case "05":
                case "5":
                    return GradeLevels.Grade5;
                case "06": 
                case "6":
                    return GradeLevels.Grade6;
                case "07": 
                case "7":
                    return GradeLevels.Grade7;
                case "08": 
                case "8":
                    return GradeLevels.Grade8;
                case "09": 
                case "9":
                    return GradeLevels.Grade9;
                case "10": return GradeLevels.Grade10;
                case "11": return GradeLevels.Grade11;
                case "12": return GradeLevels.Grade12;
                case "NA": return GradeLevels.NA;
                default: throw new ArgumentException($"String \"{s}\" is not a valid grade level.");
            }
        }

        static readonly ImmutableArray<GradeLevels> singleGrades =
            ImmutableArray.Create(
                GradeLevels.Grade3,
                GradeLevels.Grade4,
                GradeLevels.Grade5,
                GradeLevels.Grade6,
                GradeLevels.Grade7,
                GradeLevels.Grade8,
                GradeLevels.Grade9,
                GradeLevels.Grade10,
                GradeLevels.Grade11,
                GradeLevels.Grade12);

        static string FlagToString(this GradeLevels grade)
        {
            switch (grade)
            {
                case GradeLevels.NA: return "NA";
                case GradeLevels.Grade3: return "Grade 3";
                case GradeLevels.Grade4: return "Grade 4";
                case GradeLevels.Grade5: return "Grade 5";
                case GradeLevels.Grade6: return "Grade 6";
                case GradeLevels.Grade7: return "Grade 7";
                case GradeLevels.Grade8: return "Grade 8";
                case GradeLevels.Grade9: return "Grade 9";
                case GradeLevels.Grade10: return "Grade 10";
                case GradeLevels.Grade11: return "Grade 11";
                case GradeLevels.Grade12: return "Grade 12";
                case GradeLevels.Elementary: return "Grades 3-5";
                case GradeLevels.Middle: return "Grades 6-8";
                case GradeLevels.High: return "High School";
                case GradeLevels.All: return "All";
                default: return string.Empty;
            }
        }

        public static string ToDisplayString(this GradeLevels grades)
        {
            var flagString = FlagToString(grades);
            if (flagString != string.Empty)
                return flagString;

            var parts = new List<string>();
            foreach (var grade in singleGrades)
            {
                if (grades.Contains(grade))
                    parts.Add(FlagToString(grade));
            }

            return string.Join(", ", parts);
        }

        public static bool Contains(this GradeLevels haystack, GradeLevels needle)
        {
            return (haystack & needle) != GradeLevels.NA;
        }

        public static GradeLevels ToGradeLevels(this List<string> grades)
        {
            GradeLevels gradeLevels = GradeLevels.NA;
            foreach (string grade in grades)
                gradeLevels |= FromString(grade);

            return gradeLevels;
        }
    }
}
