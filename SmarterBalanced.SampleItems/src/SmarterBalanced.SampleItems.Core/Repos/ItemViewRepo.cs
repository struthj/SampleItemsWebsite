using SmarterBalanced.SampleItems.Core.Repos.Models;
using SmarterBalanced.SampleItems.Dal.Providers;
using SmarterBalanced.SampleItems.Dal.Providers.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using SmarterBalanced.SampleItems.Core.Translations;
using SmarterBalanced.SampleItems.Dal.Configurations.Models;
using System.Threading.Tasks;

namespace SmarterBalanced.SampleItems.Core.Repos
{
    public class ItemViewRepo : IItemViewRepo
    {
        private SampleItemsContext context;

        public ItemViewRepo(SampleItemsContext context)
        {
            this.context = context;
        }
        
        public AppSettings AppSettings
        {
            get
            {
                return context.AppSettings;
            }
        }
        
        public ItemDigest GetItemDigest(int bankKey, int itemKey)
        {
            return context.ItemDigests.SingleOrDefault(item => item.BankKey == bankKey && item.ItemKey == itemKey);
        }

        /// <summary>
        /// Constructs an itemviewerservice URL to access the 
        /// item corresponding to the given ItemDigest.
        /// </summary>
        private string GetItemViewerUrl(ItemDigest digest, string iSAAPcode)
        {
            if (digest == null)
            {
                return string.Empty;
            }

            string baseUrl = context.AppSettings.SettingsConfig.ItemViewerServiceURL;
            return $"{baseUrl}/item/{digest.BankKey}-{digest.ItemKey}?isaap={iSAAPcode}";
        }

        /// <summary>
        /// Constructs an itemviewerservice URL to access the 
        /// item corresponding to the given ItemDigest.
        /// </summary>
        private string GetItemViewerUrl(ItemDigest digest)
        {
            if (digest == null)
            {
                return string.Empty;
            }

            string baseUrl = context.AppSettings.SettingsConfig.ItemViewerServiceURL;
            return $"{baseUrl}/item/{digest.BankKey}-{digest.ItemKey}";
        }
        
        /// <returns>
        /// An ItemViewModel instance, or null if no item exists with
        /// the given combination of bankKey and itemKey.
        /// </returns>
        public ItemViewModel GetItemViewModel(int bankKey, int itemKey, string iSAAP = null)
        {
            iSAAP = iSAAP ?? string.Empty;
            ItemDigest itemDigest = GetItemDigest(bankKey, itemKey);
            if (itemDigest == null)
                return null;
            
            var viewerUrl = GetItemViewerUrl(itemDigest);
            var accResourceVMs = itemDigest.AccessibilityResources.ToAccessibilityResourceViewModels(iSAAP);
            var filteredVMs = accResourceVMs
                .Where(t => !t.Disabled && !t.Selections.All(s => s.Disabled))
                .ToList();

            var itemView = new ItemViewModel
            {
                ItemDigest = itemDigest,
                ItemViewerServiceUrl = GetItemViewerUrl(itemDigest),
                AccResourceVMs = filteredVMs
            };

            return itemView;
        }

    }

}
