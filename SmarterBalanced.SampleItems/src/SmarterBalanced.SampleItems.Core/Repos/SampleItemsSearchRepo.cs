﻿using SmarterBalanced.SampleItems.Core.Repos.Models;
using SmarterBalanced.SampleItems.Dal.Providers;
using SmarterBalanced.SampleItems.Dal.Providers.Models;
using System.Collections.Generic;
using System.Linq;
using Gen = SmarterBalanced.SampleItems.Dal.Xml.Models;


namespace SmarterBalanced.SampleItems.Core.Repos
{
    public class SampleItemsSearchRepo : ISampleItemsSearchRepo
     {
        private SampleItemsContext context;
        public SampleItemsSearchRepo(SampleItemsContext context)
        {
            this.context = context;
        }

        public IList<ItemDigest> GetItemDigests()
        {
            return context.ItemDigests.Where(i => i.Grade != GradeLevels.NA).ToList();
        }

        public IList<ItemDigest> GetItemDigests(string terms, GradeLevels grades, IList<string> subjects, string[] interactionTypes)
        {
            var query = context.ItemDigests.Where(i => i.Grade != GradeLevels.NA);

            // TODO: what should terms search on?

            if (grades != GradeLevels.All && grades != GradeLevels.NA)
                query = query.Where(i => GradeLevelsUtils.Contains(grades, i.Grade));

            if (subjects != null && subjects.Any())
                query = query.Where(i => subjects.Contains(i.Subject));

            if (interactionTypes.Any())
                query = query.Where(i => interactionTypes.Contains(i.InteractionTypeCode));

            return query.ToList();
        }

        public ItemsSearchViewModel GetItemsSearchViewModel()
        {
            return new ItemsSearchViewModel
            {
                InteractionTypes = context.InteractionTypes
            };
        }

    }
}
