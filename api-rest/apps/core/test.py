# -*- coding: utf-8 -*-
import nose.tools as nt
import factory
from django.test import TestCase
from models import Category

class CategoryFactory(factory.DjangoModelFactory):
  FATORY_FOR = Category
  title="Portada"	
  slug="portada"	
  
  
  
class TestCategoryCreation(TestCase):
  
  def setUp(self):
    self.category1 = CategoryFactory.create()

  def tearDown(self):
    self.category1.delete()
  
  def test_category_created(self):
    nt.eq_(self.category1.title, "Barcelona")
    nt.eq_(self.category1.slug, "portada")

  ''' 
  def test_second_house_created(self):
    house2 = HouseFactory.create(location="Hannover", balkon=False)
    self.assertNotEqual(self.house1.location, house2.location)
    self.assertEqual(self.house1.rooms, house2.rooms)
    self.assertNotEqual(self.house1.balkon, house2.balkon)
    house2.delete()
  '''