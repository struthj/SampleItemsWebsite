﻿using System;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SmarterBalanced.SampleItems.Dal.Infrastructure;
using SmarterBalanced.SampleItems.Dal.Models;
using System.IO;
using System.Reflection;
using System.Xml.Serialization;

namespace SmarterBalanced.SampleItems.Test.DalTests.InfrastructureTests
{
    public class XmlSerializationTests
    {
        /// <summary>
        /// Test that the xml serializer deserializes the XML document
        /// </summary>
        [Fact]
        public void TestDeserializeXmltoItemMetadata()
        {
            int expectedItemKey = 856;
            string expectedGrade = "7";
            string expectedTarget = "Practice Test Refresh";
            string expectedInteractionType = "HT";
            string expectedSubject = "ELA";
            string expectedClaim = "The student will identify and use the best academic or grade-level or below domain-specific (but not scientific or social studies) construct-relevant word(s)/phrase to convey the precise or intended meaning of a text especially with informational/explanatory writing.";

            string testFile = @"/Items/Item-187-856/metadata.xml";
            string baseTestDirectory = Directory.GetDirectories(Directory.GetCurrentDirectory(), "TestContentItems", SearchOption.AllDirectories)[0];
            FileInfo metadataFile = new FileInfo(baseTestDirectory + testFile);
            ItemMetadata metadata = XmlSerialization.DeserializeXml<ItemMetadata>(metadataFile);

            Assert.NotNull(metadata);
            Assert.NotNull(metadata.metadata);
            Assert.Equal(expectedItemKey, metadata.metadata.ItemKey);
            Assert.Equal(expectedGrade, metadata.metadata.Grade);
            Assert.Equal(expectedTarget, metadata.metadata.Target);
            Assert.Equal(expectedInteractionType, metadata.metadata.InteractionType);
            Assert.Equal(expectedSubject, metadata.metadata.Subject);
            Assert.Equal(expectedClaim, metadata.metadata.Claim);
        }

        /// <summary>
        /// Test that the xml serializer correctly parses item-BANK-KEY.xml
        /// </summary>
        [Fact]
        public void TestDeserializeXmltoItemContents()
        {
            int expectedItemKey = 856;
            int expectedBankKey = 187;

            string testFile = @"/Items/Item-187-856/item-187-856.xml";
            string baseTestDirectory = Directory.GetDirectories(Directory.GetCurrentDirectory(), "TestContentItems", SearchOption.AllDirectories)[0];
            FileInfo metadataFile = new FileInfo(baseTestDirectory + testFile);
            ItemContents contents = XmlSerialization.DeserializeXml<ItemContents>(metadataFile);

            Assert.Equal(expectedItemKey, contents.item.ItemKey);
            Assert.Equal(expectedBankKey, contents.item.ItemBank);
        }

        /// <summary>
        /// Test that the xml serializer will deserialize a list of documents
        /// </summary>
        [Fact]
        public async void TestDeserializeXmlFiles()
        {
            string contentDir = Directory.GetDirectories(Directory.GetCurrentDirectory(), "TestContentItems", SearchOption.AllDirectories)[0];
            IEnumerable<FileInfo> metadataFiles = await XmlSerialization.FindMetadataXmlFiles(contentDir);
            IEnumerable<ItemMetadata> metadata = await XmlSerialization.DeserializeXmlFilesAsync<ItemMetadata>(metadataFiles);
            Assert.Equal(metadataFiles.Count(), metadata.Count());

            IEnumerable<FileInfo> contentFiles = await XmlSerialization.FindContentXmlFiles(contentDir);
            IEnumerable<ItemContents> contents = await XmlSerialization.DeserializeXmlFilesAsync<ItemContents>(contentFiles);
            Assert.Equal(metadataFiles.Count(), contents.Count());
        }

        /// <summary>
        /// Test that the FindMetadataXmlFiles method finds the correct number of files
        /// </summary>
        [Fact]
        public async void TestFindMetadataXmlFiles()
        {
            int metadataFilesCount = 6;
            string contentDir = Directory.GetDirectories(Directory.GetCurrentDirectory(), "TestContentItems", SearchOption.AllDirectories)[0];
            IEnumerable<FileInfo> metadataFiles = await XmlSerialization.FindMetadataXmlFiles(contentDir);
            Assert.Equal(metadataFilesCount, metadataFiles.Count());
        }

        /// <summary>
        /// Test that the FindContentXmlFiles method finds the correct number of files
        /// </summary>
        [Fact]
        public async void TestFindContentXmlFiles()
        {
            int contentFilesCount = 6;
            string contentDir = Directory.GetDirectories(Directory.GetCurrentDirectory(), "TestContentItems", SearchOption.AllDirectories)[0];
            IEnumerable<FileInfo> contentFiles = await XmlSerialization.FindContentXmlFiles(contentDir);
            Assert.Equal(contentFilesCount, contentFiles.Count());
        }
    }
}
