﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmarterBalanced.SampleItems.Core.Interfaces;
using SmarterBalanced.SampleItems.Dal.Interfaces;
using SmarterBalanced.SampleItems.Core.Infrastructure;


namespace SmarterBalanced.SampleItems.Web.Controllers
{
    public class ItemsSearchController : Controller
    {
        private ISampleItemsSearch s_repo;

        public ItemsSearchController(ISampleItemsRepo repo)
        {
            s_repo = new SampleItemsSearch(repo);
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
