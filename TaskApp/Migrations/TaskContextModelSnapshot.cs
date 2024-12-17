﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TaskApp.Models;

#nullable disable

namespace TaskApp.Migrations
{
    [DbContext(typeof(TaskContext))]
    partial class TaskContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TaskApp.Models.StdSubj", b =>
                {
                    b.Property<int>("stdId")
                        .HasColumnType("int");

                    b.Property<int>("subjId")
                        .HasColumnType("int");

                    b.HasKey("stdId", "subjId");

                    b.HasIndex("subjId");

                    b.ToTable("StdSubjs");
                });

            modelBuilder.Entity("TaskApp.Models.Student", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("students");
                });

            modelBuilder.Entity("TaskApp.Models.Subject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("subjects");
                });

            modelBuilder.Entity("TaskApp.Models.StdSubj", b =>
                {
                    b.HasOne("TaskApp.Models.Student", "Student")
                        .WithMany("StdSubjs")
                        .HasForeignKey("stdId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TaskApp.Models.Subject", "Subject")
                        .WithMany("StdSubjs")
                        .HasForeignKey("subjId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Student");

                    b.Navigation("Subject");
                });

            modelBuilder.Entity("TaskApp.Models.Student", b =>
                {
                    b.Navigation("StdSubjs");
                });

            modelBuilder.Entity("TaskApp.Models.Subject", b =>
                {
                    b.Navigation("StdSubjs");
                });
#pragma warning restore 612, 618
        }
    }
}
