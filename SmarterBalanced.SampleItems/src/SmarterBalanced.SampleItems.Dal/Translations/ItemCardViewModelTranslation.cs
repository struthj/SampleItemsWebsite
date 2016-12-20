﻿using SmarterBalanced.SampleItems.Dal.Providers.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmarterBalanced.SampleItems.Dal.Translations
{
    public static class ItemCardViewModelTranslation
    {
        public static ItemCardViewModel ToItemCardViewModel(this ItemDigest digest)
        {
            string claimTitle = (string.IsNullOrEmpty(digest.Claim?.ClaimNumber)) ? string.Empty : $"Claim {digest.Claim.ClaimNumber}";
            string title = $"{digest.Subject?.ShortLabel} {digest.Grade.ToDisplayString()} {claimTitle}";

            var card = new ItemCardViewModel(
                bankKey: digest.BankKey,
                itemKey: digest.ItemKey,
                title: title,
                grade: digest.Grade,
                gradeLabel: digest.Grade.ToDisplayString(),
                subjectCode: digest.Subject?.Code,
                subjectLabel: digest.Subject?.ShortLabel,
                claimCode: digest.Claim?.Code,
                claimLabel: digest.Claim?.Label,
                target: digest.TargetId,
                interactionTypeCode: digest.InteractionType?.Code,
                interactionTypeLabel: digest.InteractionType?.Label);

            return card;
        }
    }
}
