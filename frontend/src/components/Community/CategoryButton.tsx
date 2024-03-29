import React from 'react'
import { CategoryType } from '@src/types/components/CommunityType'
import * as c from '@src/components/style/CategoryStyle'

interface CategoryButtonProps {
  categories: CategoryType[]
  onCategoryClick: (categoryNo: number) => void
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  categories,
  onCategoryClick,
}) => {
  return (
    <div>
      {categories.map(item => (
        <c.Button
          type="button"
          key={item.communityCategoryNo}
          onClick={() => onCategoryClick(item.communityCategoryNo)}
        >
          {item.communityCategoryName}
        </c.Button>
      ))}
    </div>
  )
}

export default CategoryButton
